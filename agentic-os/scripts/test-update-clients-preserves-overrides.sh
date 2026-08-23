#!/usr/bin/env bash
set -euo pipefail

TEST_ROOT="${TMPDIR:-/tmp}/agentic-os-update-clients-preserve-test"
REAL_REPO="$(cd "$(dirname "$0")/.." && pwd)"
TEST_REPO="${TEST_ROOT}/repo"
OUTPUT_FILE="${TEST_ROOT}/update-clients.out"

pass() {
  printf "  \033[0;32m✓ %s\033[0m\n" "$1"
}

fail() {
  printf "  \033[0;31m✗ %s\033[0m\n" "$1" >&2
  if [[ -f "$OUTPUT_FILE" ]]; then
    echo ""
    echo "update-clients.sh output:" >&2
    sed -n '1,220p' "$OUTPUT_FILE" >&2
  fi
  exit 1
}

assert_file_exists() {
  local path="$1"
  local message="$2"
  [[ -f "$path" ]] || fail "$message"
  pass "$message"
}

assert_file_contains() {
  local path="$1"
  local expected="$2"
  local message="$3"
  grep -Fq "$expected" "$path" || fail "$message"
  pass "$message"
}

assert_files_match() {
  local expected="$1"
  local actual="$2"
  local message="$3"
  cmp -s "$expected" "$actual" || fail "$message"
  pass "$message"
}

assert_file_not_contains() {
  local path="$1"
  local unexpected="$2"
  local message="$3"
  if grep -Fq "$unexpected" "$path"; then
    fail "$message"
  fi
  pass "$message"
}

trap 'rm -rf "$TEST_ROOT"' EXIT
rm -rf "$TEST_ROOT"

mkdir -p \
  "${TEST_REPO}/scripts" \
  "${TEST_REPO}/.claude/skills/example-skill/references" \
  "${TEST_REPO}/.claude/skills/_catalog" \
  "${TEST_REPO}/clients/acme/.claude/skills/example-skill/references" \
  "${TEST_REPO}/clients/acme/.claude/skills/_catalog" \
  "${TEST_REPO}/clients/acme/.claude/skills/client-only"

cp "${REAL_REPO}/scripts/update-clients.sh" "${TEST_REPO}/scripts/update-clients.sh"

cat > "${TEST_REPO}/.claude/skills/example-skill/SKILL.md" <<'EOF'
# Example Skill

Root version after update.
EOF

cat > "${TEST_REPO}/.claude/skills/example-skill/references/root-note.md" <<'EOF'
Root reference copied during sync.
EOF

cat > "${TEST_REPO}/.claude/skills/_catalog/catalog.json" <<'EOF'
{
  "version": "root-catalog-v2",
  "skills": {
    "example-skill": {
      "category": "utility",
      "description": "Example root skill"
    }
  }
}
EOF

cat > "${TEST_REPO}/.claude/skills/_catalog/installed.json" <<'EOF'
{
  "installed_skills": ["root-default"],
  "removed_skills": []
}
EOF

cat > "${TEST_REPO}/clients/acme/.claude/skills/example-skill/SKILL.md" <<'EOF'
# Example Skill

Old client base version that should be replaced.
EOF

cat > "${TEST_ROOT}/expected-skill-local.md" <<'EOF'
## Rules

- Keep this client-specific override exactly.
EOF
cp "${TEST_ROOT}/expected-skill-local.md" "${TEST_REPO}/clients/acme/.claude/skills/example-skill/SKILL.local.md"

cat > "${TEST_REPO}/clients/acme/.claude/skills/client-only/SKILL.md" <<'EOF'
# Client-only Skill

This skill only exists in the client workspace.
EOF

cat > "${TEST_ROOT}/expected-installed.json" <<'EOF'
{
  "installed_skills": ["client-selected"],
  "removed_skills": ["root-default"]
}
EOF
cp "${TEST_ROOT}/expected-installed.json" "${TEST_REPO}/clients/acme/.claude/skills/_catalog/installed.json"

cat > "${TEST_REPO}/clients/acme/.claude/skills/_catalog/catalog.json" <<'EOF'
{
  "version": "old-client-catalog"
}
EOF

bash "${TEST_REPO}/scripts/update-clients.sh" > "$OUTPUT_FILE" 2>&1

CLIENT_SKILL_DIR="${TEST_REPO}/clients/acme/.claude/skills/example-skill"
CLIENT_CATALOG_DIR="${TEST_REPO}/clients/acme/.claude/skills/_catalog"

assert_files_match \
  "${TEST_ROOT}/expected-skill-local.md" \
  "${CLIENT_SKILL_DIR}/SKILL.local.md" \
  "client SKILL.local.md keeps its original content"

assert_file_contains \
  "${CLIENT_SKILL_DIR}/SKILL.md" \
  "Root version after update." \
  "root SKILL.md still syncs into the client"

assert_file_exists \
  "${CLIENT_SKILL_DIR}/references/root-note.md" \
  "root skill reference files still sync into the client"

assert_file_exists \
  "${TEST_REPO}/clients/acme/.claude/skills/client-only/SKILL.md" \
  "client-only skill survives client sync"

assert_files_match \
  "${TEST_ROOT}/expected-installed.json" \
  "${CLIENT_CATALOG_DIR}/installed.json" \
  "client installed.json keeps its original content"

assert_file_contains \
  "${CLIENT_CATALOG_DIR}/catalog.json" \
  "root-catalog-v2" \
  "root catalog.json still syncs into the client"

assert_file_contains \
  "$OUTPUT_FILE" \
  "local override(s) preserved" \
  "sync output reports preserved local overrides"

mkdir -p \
  "${TEST_REPO}/.claude/skills/future-root" \
  "${TEST_REPO}/clients/acme/.claude/skills/future-root"

cat > "${TEST_REPO}/.claude/skills/future-root/SKILL.md" <<'EOF'
# Future Root Skill

Root skill that arrived after a client-only skill already existed.
EOF

cat > "${TEST_REPO}/clients/acme/.claude/skills/future-root/SKILL.md" <<'EOF'
# Client-Owned Future Root Skill

This client-owned skill must not be overwritten by update-clients.sh.
EOF

bash "${TEST_REPO}/scripts/update-clients.sh" > "$OUTPUT_FILE" 2>&1

assert_file_contains \
  "${TEST_REPO}/clients/acme/.claude/skills/future-root/SKILL.md" \
  "client-owned skill must not be overwritten" \
  "client-owned skill is preserved when a root skill later uses the same name"

assert_file_contains \
  "$OUTPUT_FILE" \
  "preserved client-owned skill folder" \
  "sync output warns about a client-owned skill/root skill name collision"

assert_file_not_contains \
  "${TEST_REPO}/clients/acme/.gitignore" \
  ".claude/skills/future-root/*" \
  "colliding client-owned skill is not added to generated gitignore"

echo ""
pass "update-clients preserves client overrides and skill selection state"
