# AI Maintenance Guide — [Project Name]

> **Version:** [Product version this doc covers, e.g., 1.0.0]
> **Last Updated:** YYYY-MM-DD
> **Status:** [ ] Draft | [x] Current
>
> **Purpose:** This document allows a future AI assistant to understand and safely
> maintain this project without access to the original development conversation.
> **Reading time:** ~15 minutes

---

## ⚠️ Start Here (Read This First)

Before making ANY change to this project:
1. Read Section 14 (Do Not Touch) to understand what must not be changed casually.
2. Read Section 15 (Safe Modifications) to find low-risk areas.
3. Create a recovery checkpoint commit before any significant change.
4. Run all tests after changes: `[test command]`

---

## 1. Product Overview

### What This Product Is
[One paragraph. What does it do? Who uses it? What problem does it solve?]

### Core User Workflows
The three most important things users do in this system:
1. [Workflow 1] — [Brief description of the flow]
2. [Workflow 2] — [Brief description]
3. [Workflow 3] — [Brief description]

### What Would Break Without This Product
[What would users do instead? What pain does this solve?]

---

## 2. Architecture Overview

### High-Level Diagram
```
[Browser/Client]
      ↓ HTTPS
[CDN / Load Balancer]
      ↓
[Application Server]  ←→  [Database]
      ↓                        ↓
[External APIs]          [File Storage]
```

### Component Interaction
[Describe how the main components communicate. What calls what? What stores what?]

### Most Common Request Flow
[Step-by-step: what happens when a user performs the most common action?]
1. [Step 1]
2. [Step 2]
3. [...]

---

## 3. Technology Stack

| Layer | Technology | Version | Why It Was Chosen |
|---|---|---|---|
| Frontend | [Framework] | [v.x.x] | [Rationale] |
| Backend | [Framework] | [v.x.x] | [Rationale] |
| Database | [DB] | [v.x.x] | [Rationale] |
| Cache | [Cache] | [v.x.x] | [Rationale] |
| Authentication | [Auth solution] | [v.x.x] | [Rationale] |
| Storage | [Storage] | [N/A] | [Rationale] |
| Hosting | [Host] | [N/A] | [Rationale] |
| CI/CD | [CI tool] | [N/A] | [Rationale] |
| Error Tracking | [Tool] | [N/A] | [Rationale] |

---

## 4. Repository Structure

```
[project-name]/
├── src/                    ← [What lives here]
│   ├── [dir]/              ← [What this dir contains]
│   └── [dir]/
├── tests/                  ← [Test structure]
├── docs/                   ← Project documentation
│   ├── PROJECT.md
│   ├── DECISIONS.md
│   ├── ARCHITECTURE.md
│   └── AI-MAINTENANCE.md   ← This file
├── .env.example            ← Environment variable template (no secrets)
├── [config files]          ← [What each config file does]
└── README.md
```

---

## 5. Setup Instructions

### Prerequisites
- [Prerequisite 1] version [X.X]
- [Prerequisite 2] version [X.X]

### Step-by-Step Setup
```bash
# 1. Clone the repository
git clone [repository-url]
cd [project-name]

# 2. Install dependencies
[install command]

# 3. Copy environment template
cp .env.example .env

# 4. Configure environment variables
# Edit .env — see Section 6 for required variables

# 5. Set up the database
[database setup commands]

# 6. Run the application
[start command]

# 7. Verify it's running
# Open [URL] in your browser
```

### Common Setup Problems
| Problem | Likely Cause | Solution |
|---|---|---|
| [Error message] | [Cause] | [Fix] |

---

## 6. Environment Configuration

All environment variables required to run this application:

| Variable | Required | Description | Example Value |
|---|---|---|---|
| `DATABASE_URL` | ✅ | Database connection string | `postgresql://user:pass@host:5432/db` |
| `[VAR_NAME]` | ✅ | [What it controls] | [Safe example, NOT real value] |
| `[VAR_NAME]` | Optional | [What it controls] | [Default if not set] |

### Where Secrets Are Stored
- Production: [Secret management system — e.g., Railway Secrets, AWS Secrets Manager]
- Staging: [Where staging secrets are stored]
- Local development: `.env` file (never committed to Git)

### ⚠️ Never Commit Secrets
The `.env` file is in `.gitignore`. Check `git log -p | grep "SECRET\|KEY\|PASSWORD\|TOKEN"`
before any commit to verify no secrets leaked.

---

## 7. Database

### Schema Overview
[Brief description of the main entities and their relationships]

### Key Tables/Collections
| Table | Purpose | Key Fields |
|---|---|---|
| `[table_name]` | [What this stores] | `[key fields]` |

### Running Migrations
```bash
# Apply pending migrations
[migration command]

# Create a new migration
[create migration command]

# Roll back last migration
[rollback command]
```

### Database Backup & Restore
```bash
# Backup
[backup command]

# Restore
[restore command]
```

### ⚠️ Database Warnings
[Any important warnings about the database — constraints, assumptions, data that must not be deleted]

---

## 8. API Reference

### Authentication
All API requests require: [Auth header / Cookie / etc.]
```
Authorization: Bearer [token]
```

### Key Endpoints

| Method | Path | Auth Required | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Authenticate user |
| GET | `/api/[resource]` | Yes | [Description] |
| POST | `/api/[resource]` | Yes | [Description] |
| PUT | `/api/[resource]/:id` | Yes | [Description] |
| DELETE | `/api/[resource]/:id` | Yes | [Description] |

Full API documentation: `docs/api/api-reference.md` (or [URL])

---

## 9. Deployment

### Environments
| Environment | URL | Branch | Purpose |
|---|---|---|---|
| Production | [URL] | `main` | Live users |
| Staging | [URL] | `staging` | Pre-release testing |
| Development | `localhost:[PORT]` | `develop` | Local development |

### Deployment Process (Production)
```bash
# 1. Merge approved PR to main
git checkout main
git merge staging

# 2. Tag the release
git tag -a [project]/v[version] -m "Release v[version]"

# 3. Push to trigger CI/CD (REQUIRES AUTHORIZATION)
git push origin main
git push origin [project]/v[version]

# 4. Monitor deployment
[monitoring URL or command]

# 5. Run smoke tests
[smoke test command or URL to check]
```

### CI/CD Pipeline
[Description of CI/CD pipeline — what triggers it, what it runs, where it deploys]

---

## 10. Testing

### Running Tests
```bash
# All tests
[test command]

# Unit tests only
[unit test command]

# Integration tests only
[integration test command]

# E2E tests only
[e2e test command]

# With coverage report
[coverage command]
```

### Coverage Expectations
- Business logic: ≥80%
- API endpoints: ≥70%
- Overall: ≥65%

### Adding New Tests
[Brief explanation of where to add new tests and any conventions to follow]

---

## 11. Security

### Authentication Model
[How authentication works — tokens, sessions, cookies, expiry]

### Authorization Model
[How authorization works — roles, permissions, what each role can do]

### Secret Rotation
To rotate [credential type]:
1. [Step 1]
2. [Step 2]
3. [Verify no outages]

### Known Security Considerations
- [Any specific security thing a maintainer should know]
- [e.g., Rate limiting is applied to /api/auth/* routes]
- [e.g., File uploads are validated server-side by MIME type, not extension]

---

## 12. Known Issues

| ID | Description | Severity | Workaround | Target Fix |
|---|---|---|---|---|
| [BUG-001] | [Description] | Low | [Workaround] | v1.1 |

---

## 13. Technical Debt

| Item | Description | Risk Level | Rationale for Deferral |
|---|---|---|---|
| [TD-001] | [What the debt is] | Low/Med/High | [Why it was deferred] |

---

## 14. Architectural Decisions

### Decision: [Decision Name]
**What was decided:** [The choice made]
**Context:** [Why this decision was needed]
**Why this option:** [Rationale]
**Alternatives rejected:** [What else was considered and why rejected]
**Consequences:** [What this decision means for the future]
**Reference:** `docs/DECISIONS.md` — entry dated [YYYY-MM-DD]

---

## 15. Do Not Touch (DNT)

### DNT: [What not to touch]
**Location:** `[file path]`
**Why:** [Explanation of why this is dangerous to change]
**If you need to change this:** [Safe procedure for making this change if truly necessary]

---

## 16. Safe Modifications

### SAFE: [What is safe to modify]
**Location:** `[file path or directory]`
**Why it's safe:** [Explanation]
**How to modify safely:**
1. [Step 1]
2. [Step 2]
3. Verify: [How to verify the change works]

---

## 17. Rollback Procedures

### Rolling Back a Production Deployment

```bash
# 1. Identify the last stable release tag
git tag -l | sort -V | tail -20

# 2. Check out the stable version locally
git checkout [project]/v[previous-version]

# 3. Deploy the stable version
[deployment command for specific version]

# 4. Verify rollback
[verification steps]

# 5. Record the rollback in DECISIONS.md
```

### Database Rollback (if migration was applied)
```bash
# Roll back the migration
[rollback command]

# Verify database state
[verification query]
```

### Rollback Estimated Time
[Estimated time to complete a rollback — important for incident response]

---

## Maintenance History

### v[version] — YYYY-MM-DD
- [Change made]
- [Documentation section updated]

### v1.0.0 — YYYY-MM-DD
- Initial production release
- AI-MAINTENANCE.md created
