# Rule 02 — No Production Code Before Approval

## Statement

Production application code is **LOCKED** until all four mandatory approval gates
have been explicitly cleared by the Founder.

## The Four Required Gates

| Gate | What Must Be Approved |
|---|---|
| GATE-01 | Product Blueprint |
| GATE-02 | HTML/CSS/JS Prototype (approved at end of Phase 9) |
| GATE-03 | Technical Architecture + Technology Evaluation |
| GATE-04 | Implementation Plan |

**ALL FOUR must be approved before a single line of production code is written.**

---

## What Is "Production Code"?

Production code means code intended to be deployed, run in a real environment,
or become part of the actual software product. This includes:

- Application source code (frontend, backend, mobile)
- Database schemas and migrations
- Infrastructure-as-code targeting real environments (Terraform, Pulumi, CDK, etc.)
- CI/CD pipeline configurations for production
- Docker/Kubernetes configurations for production deployment
- Any code that provisions real cloud resources or incurs real infrastructure cost

---

## Prototype vs. Production Code — Absolute Boundary

**"Near-production quality"** refers **exclusively** to visual and UX polish.
It does NOT refer to technical stack, dependencies, or architecture.

### A PROTOTYPE is:
- ✅ Pure HTML files (`.html`) — markup only with hardcoded/static data
- ✅ Pure CSS files (`.css`) — styling and layout only
- ✅ Vanilla JavaScript (`.js`) — UI interaction simulation only
- ✅ Static image/icon assets
- ✅ Self-contained — opens directly from the filesystem, no server required

### A PROTOTYPE explicitly is NOT:
- ❌ Any production framework (React, Vue, Angular, Next.js, Svelte, etc.)
- ❌ Any real database connection or ORM
- ❌ Any real HTTP API calls to live/production services
- ❌ Real authentication or session management
- ❌ Production environment variables or real secrets
- ❌ Infrastructure code targeting real cloud resources
- ❌ Code intended to be refactored into or serve as the foundation for production code

If any of the ❌ items above apply, the work is **PRODUCTION CODE** and requires
GATE-01 through GATE-04 to be cleared first.

---

## Local Development Configuration (Permitted Before Gates)

The following local dev configurations are NOT considered production code
and may be created during the prototype phase for local development only:

- ✅ `docker-compose.yml` for LOCAL development only (no cloud targeting)
- ✅ `.env.example` files (example values only — no real secrets)
- ✅ `Makefile` or local helper scripts for prototype development
- ✅ Local testing configuration stubs (`jest.config.js` example, etc.)

The following ARE production infrastructure and require GATE-04 clearance:

- ❌ Terraform, Pulumi, or CDK files targeting any real cloud environment
- ❌ Kubernetes manifests targeting real clusters
- ❌ CI/CD pipeline configuration (GitHub Actions, CircleCI, etc.) for production
- ❌ Any IaC that provisions real cloud resources or costs real money

---

## What Is NOT Production Code (Permitted Before Gates)

| Item | Permitted Before Gates? | Notes |
|---|---|---|
| HTML/CSS/JS prototype | ✅ Yes (after GATE-01 Blueprint approval) | Strict prototype boundary applies |
| Document files (`.md`) | ✅ Yes (encouraged at all phases) | |
| Architecture diagrams | ✅ Yes | |
| User flow diagrams | ✅ Yes | |
| Research and analysis | ✅ Yes | |
| Technology comparison | ✅ Yes | |
| Template files | ✅ Yes | |
| Local dev `docker-compose.yml` | ✅ Yes | Local only, no cloud targeting |
| `.env.example` | ✅ Yes | Example values only |

---

## Override Protocol

The Founder may explicitly override this rule. Overrides are allowed —
the Founder has final authority. However, the procedure is non-negotiable:

1. **ACKNOWLEDGE** — Confirm the override request:
   > "You are asking to override [specific gate/rule]. I understand."

2. **RISK STATEMENT** — Present the specific risks:
   - What artifact/review is being skipped
   - What problems can arise without it
   - What cannot be reverted once production code exists

3. **CONFIRM** — Ask the Founder to explicitly accept the risks:
   > "Do you confirm you accept these risks and authorize bypassing [gate]?
   > Reply CONFIRM to proceed."

4. **RECORD** — Before proceeding, write to `docs/DECISIONS.md`:
   ```markdown
   ## YYYY-MM-DD — Gate Override Authorized
   Gate bypassed: GATE-0X
   Authorized by: Founder
   Risks acknowledged: [list the stated risks]
   Date: YYYY-MM-DD
   ```

5. **PROCEED** — Only after the DECISIONS.md entry is written.

**This procedure is defined canonically in:** `.agents/plugins/ai-software-agency/agency-reference/approval-gates/GATES.md`
Rule 02 and GATES.md use **identical** override protocols. GATES.md is the
authoritative source if they ever appear to differ.
