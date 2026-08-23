# Future Dashboard Architecture

## Purpose

This document defines the intended architecture for the Local Business AI command centre — a future web-based dashboard that gives operators and clients a visual interface to manage audits, track business health, monitor AI jobs, and review reports.

This is a planning and architecture document only. No frontend code exists yet. When implementation begins, this document is the authoritative specification.

The dashboard must be model-agnostic. It communicates with the platform through the `/api` layer and must function identically regardless of which AI model (Google Antigravity, Gemini, Claude, GPT, or Codex) is configured for a given client or workflow.

---

## 1. Admin Dashboard

The Admin Dashboard is the operator-facing command centre. It provides a unified view of all clients, all running jobs, system health, and platform-level configuration. Only authorised operators have access.

---

### 1.1 Client Management

**Purpose:** A master registry of all client workspaces on the platform.

**What it displays:**
- List of all active clients with business name, category, and location
- Client status: Onboarding / Active / Paused / Archived
- Last audit date per client (per module)
- Next scheduled audit date
- Quick-access links to each client workspace
- Client creation, editing, and archival controls

**Data source:** `clients/` directory — each client folder's `config/` and `memory/business-memory/`

**Actions available:**
- Create a new client workspace (scaffolds the standard folder structure)
- Edit client details (name, category, URL, GBP ID)
- Archive a client (marks as inactive, preserves all data)
- Open client planning workspace
- Trigger a manual audit run for a specific client

---

### 1.2 Audit Queue

**Purpose:** A real-time view of all audits that are pending, running, or recently completed across all clients.

**What it displays:**
- Queue position and estimated start time for pending audits
- Client name, audit module, and priority level for each queued item
- Currently running audits with live progress status messages (sourced from Standard 6 of `docs/quality-of-life.md`)
- Completed audits from the last 24 hours with pass/fail status

**Data source:** Platform job scheduler (future implementation in `/system`)

**Actions available:**
- Promote a queued audit to higher priority
- Cancel a queued audit
- Re-queue a failed audit
- Pause the entire queue (maintenance mode)

**Queue states per audit:**
```
Queued → Running → Completed
                 → Failed (with error detail)
                 → Partial (completed with missing data — see graceful failure rules)
```

---

### 1.3 Running AI Jobs

**Purpose:** A live activity monitor showing every AI job currently in execution across the platform.

**What it displays:**
- Job ID, client name, workflow name, and skill currently executing
- AI model assigned to the job (Antigravity, Gemini, Claude, GPT, or Codex)
- Start time and elapsed duration
- Current status message (real-time, sourced from the skill's status output)
- Token usage estimate for the current job (where the model API supports it)
- Memory write operations in progress (which memory type is being written to)

**Data source:** Platform runtime in `/system`; status messages from active skills

**Actions available:**
- View full live log for a running job
- Kill a running job (with confirmation)
- Flag a job for post-run review

---

### 1.4 Reports

**Purpose:** A central library of all generated reports across all clients.

**What it displays:**
- Full report index: client name, report type, date generated, AI model used, file format, file size
- Report version history per client per module
- Download links for PDF, Markdown, and HTML variants
- Report status: Draft / Final / Archived
- Filter controls: by client, by report type, by date range, by AI model

**Data source:** `clients/{client}/reports/` — report metadata records written by the `pdf-export` skill

**Actions available:**
- Download a report
- Regenerate a report from existing audit data (without re-running the audit)
- Archive an old report version
- Send a report to the client (future: email integration)

---

### 1.5 API Usage

**Purpose:** A monitoring panel for all external API consumption across the platform.

**What it displays:**
- API call volume by source (GBP API, PageSpeed Insights, Moz, SEMrush, etc.)
- API call volume by client
- Error rate per API source
- Rate limit status: current usage vs. limit per API
- Estimated monthly API cost (where pricing data is configured)
- API key health status (active / expiring / expired)

**Data source:** API adapter layer in `/api` — each adapter logs usage to `logs/`

**Actions available:**
- View detailed call history for a specific API source
- Rotate or update an API key (links to `/config`)
- Set usage alerts (notify when approaching rate limits)

---

### 1.6 Error Logs

**Purpose:** A structured, searchable log of all platform errors, warnings, and exceptions.

**What it displays:**
- Timestamped error entries: severity (ERROR / WARN), module name, client name, error message
- Error frequency trends (recurring errors surface to the top)
- Resolved vs. unresolved error status
- Full stack trace or detail payload per entry (expandable)
- Filter controls: by severity, by client, by module, by date range

**Data source:** `logs/` directory — all skills and workflows write structured log entries here

**Actions available:**
- Mark an error as resolved
- Re-trigger the failed job that produced the error
- Export error log as CSV for external analysis
- Set alert rules (notify operator when error count exceeds threshold)

---

### 1.7 System Health

**Purpose:** A high-level health dashboard for the entire platform.

**What it displays:**
- Platform status: Healthy / Degraded / Down
- Active AI model connections: status per model (Antigravity, Gemini, Claude, GPT, Codex)
- External API connectivity: green/amber/red per API source
- Disk usage: total storage consumed by `clients/`, `logs/`, `reports/`, and `memory/`
- Job throughput: audits completed in the last hour / 24 hours / 7 days
- Memory layer health: last write timestamp per memory type, any write errors
- Queue depth: number of jobs currently waiting

**Data source:** Platform system monitor (future implementation in `/system`); `/api` adapter health checks; filesystem stats

**Actions available:**
- Trigger a full platform health check
- Clear stale job locks
- Purge old log files (with age threshold configuration)
- Switch active AI model for a specific workflow (model routing override)

---

## 2. Client Dashboard

The Client Dashboard is a read-only view designed for the business owner or their designated contact. It presents the health and progress of their business in plain, non-technical language. Operators control what is visible to each client.

---

### 2.1 Business Score

**Purpose:** A single, at-a-glance overall health score for the client's digital presence.

**What it displays:**
- Composite score (0–100) aggregated across all completed audit modules
- Score grade classification (Excellent / Good / Needs Improvement / Critical)
- Sub-scores per module: GBP, Reviews, Website, Local SEO, Citations, Competitors
- Score trend: how the composite score has changed over the last 3 audit cycles
- Visual score indicator (dial, progress ring, or bar — TBD at implementation)

**Data source:** `clients/{client}/memory/audit-memory/` — aggregated scores from all completed audit runs

---

### 2.2 Audit History

**Purpose:** A timeline of every audit that has been run for this client.

**What it displays:**
- Chronological list of all completed audit runs (date, module, score, AI model used)
- Status per audit: Completed / Partial / Failed
- Score at the time of each audit (for trend visualisation)
- Link to the report generated from each audit run

**Data source:** `clients/{client}/memory/audit-memory/`

---

### 2.3 Recommendations

**Purpose:** The client's current prioritised action list in plain, non-technical language.

**What it displays:**
- Active recommendations from the most recent audit cycle, sorted by priority: Critical → High → Medium → Low
- Effort estimate per recommendation (Quick Win / Medium Effort / Long-Term)
- Status per recommendation: Pending / In Progress / Completed / Dismissed
- Which audit module each recommendation came from

**Data source:** `clients/{client}/memory/decision-memory/`

---

### 2.4 Monthly Progress

**Purpose:** A summary of progress made in the current month.

**What it displays:**
- Number of recommendations actioned this month
- Score change since the start of the month (positive or negative delta)
- Audits completed this month
- Key wins: specific improvements that have been made (sourced from decision-memory outcomes)
- Outstanding items: what is still pending from this month's plan

**Data source:** `clients/{client}/memory/decision-memory/`; `clients/{client}/planning/progress.md`

---

### 2.5 Google Review Tracking

**Purpose:** A live view of the client's Google review health.

**What it displays:**
- Current overall star rating and total review count
- Review velocity chart: new reviews per month over the last 6 months
- Rating distribution breakdown (1★ through 5★)
- Response rate: percentage of reviews that have received an owner response
- Most recent reviews (up to 10) with rating, excerpt, and response status
- Review sentiment trend: improving / stable / declining

**Data source:** `clients/{client}/memory/audit-memory/` (review analysis results); `clients/{client}/reviews/`

---

### 2.6 Website Health

**Purpose:** A summary of the client's website health status.

**What it displays:**
- Website health score (from the most recent website audit)
- Core Web Vitals status: LCP, INP, CLS — pass/fail per metric
- Mobile readiness status
- HTTPS status
- Top 3 issues identified in the most recent website audit
- Last audit date

**Data source:** `clients/{client}/memory/audit-memory/` (website audit results)

---

### 2.7 Local SEO Health

**Purpose:** A summary of the client's local search optimisation status.

**What it displays:**
- Local SEO score (from the most recent local SEO audit)
- NAP consistency status: consistent / inconsistencies detected
- Schema markup status: present and valid / missing / invalid
- Citation count: total citations found / accurate / inconsistent / missing
- Top 3 local SEO issues from the most recent audit
- Last audit date

**Data source:** `clients/{client}/memory/audit-memory/` (local SEO and citation audit results)

---

## 3. Version Tracking

Version tracking gives operators and contributors a clear, reliable record of what changed, when, and why — across both the platform codebase and the active deployment.

---

### CHANGELOG.md

**Location:** Project root (`local-business-ai/CHANGELOG.md`) — to be created at platform v0.1.0

**Purpose:**
`CHANGELOG.md` is the human-readable history of every meaningful change made to the platform. It is the first place an operator looks when something behaves differently after an update, and the first place a contributor looks to understand the evolution of the platform.

**Format:** Follows the [Keep a Changelog](https://keepachangelog.com) standard, organised by version number and release date.

```
## [1.2.0] — 2025-06-01

### Added
- Citation audit workflow
- Citation analysis skill

### Changed
- Scoring rubric weights updated for GBP module

### Fixed
- Report writer skill: empty section handling

### Deprecated
- Legacy prompt format v1 (will be removed in v2.0.0)
```

**Rules:**
- Every pull request or completed development phase must include a CHANGELOG entry
- Entries are added to the top of the file (newest first)
- Unreleased changes accumulate under an `[Unreleased]` heading until a version is cut
- The CHANGELOG is written for operators and contributors, not for end clients

---

### VERSION.md

**Location:** Project root (`local-business-ai/VERSION.md`) — to be created at platform v0.1.0

**Purpose:**
`VERSION.md` is the single source of truth for the current deployed version of the platform. It is read programmatically by the platform to stamp reports, log files, and audit records with the correct version identifier.

**Contents:**

```
# Platform Version

Current Version : 1.2.0
Release Date    : 2025-06-01
Environment     : Production

## Version History

| Version | Release Date | Summary |
|---|---|---|
| 1.2.0 | 2025-06-01 | Citation audit module added |
| 1.1.0 | 2025-04-15 | Memory layer introduced |
| 1.0.0 | 2025-03-01 | Initial production release |
```

**Rules:**
- Version follows Semantic Versioning: `MAJOR.MINOR.PATCH`
  - MAJOR: breaking changes to existing workflows or skill interfaces
  - MINOR: new audit modules, new skills, new workflows added
  - PATCH: bug fixes, documentation corrections, prompt adjustments
- The current version in `VERSION.md` must always match the latest tagged release
- Every generated report is stamped with the platform version at time of generation, sourced from this file

---

## 4. Scheduled Jobs

**Purpose:** Automated audit scheduling removes the need for operators to manually trigger every audit run. The future scheduling system allows audits to be configured to run on a recurring basis — daily, weekly, monthly, or on a custom cron schedule — per client and per module.

**How scheduled jobs will appear in the Admin Dashboard:**

Each scheduled job appears as a row in the Audit Queue panel (Section 1.2) with the following fields:

```
| Client         | Module          | Schedule        | Last Run    | Next Run    | Status   |
|----------------|-----------------|-----------------|-------------|-------------|----------|
| demo-business  | GBP Audit       | Monthly (1st)   | 2025-06-01  | 2025-07-01  | Scheduled|
| demo-business  | Review Analysis | Weekly (Mon)    | 2025-06-16  | 2025-06-23  | Scheduled|
| demo-business  | Website Audit   | Quarterly       | 2025-04-01  | 2025-07-01  | Scheduled|
```

**Scheduling configuration:**

Job schedules are defined in `clients/{client}/config/` as structured configuration (not code). An operator configures the schedule through the dashboard UI; the configuration is written to the client's config folder and read by the platform scheduler at runtime.

**Job lifecycle states:**
```
Scheduled → Triggered → Queued → Running → Completed
                                          → Failed → Retry (up to configured limit)
                                                    → Dead Letter (manual intervention required)
```

**Notifications:**
- Operators receive a status notification when a scheduled job completes, fails, or requires intervention
- The system emits a `Completed.` status message (per Standard 6 of `docs/quality-of-life.md`) at the end of every scheduled run
- Failed scheduled jobs surface immediately in the Error Logs panel (Section 1.6)

**Rules:**
- A scheduled job never runs if the same job is already in the queue or running for the same client
- Scheduled jobs respect the same graceful failure rules as manually triggered audits (Standard 3 of `docs/quality-of-life.md`)
- All scheduled job runs are written to `audit-memory` with a `trigger: scheduled` tag to distinguish them from manually triggered runs

---

## 5. Skills Library

**Purpose:** The Skills Library is a browsable, searchable catalogue of every skill available on the platform. It gives operators a clear view of what the platform can do, which skills are active, and how skills are composed into workflows.

**How it appears in the Admin Dashboard:**

The Skills Library is a dedicated panel in the Admin Dashboard (accessible from the main navigation). It is read-only — skills are defined in `skills/`, not configured through the dashboard.

**What each skill entry displays:**

```
Skill Name       : Review Analysis
Location         : skills/review-analysis/
Status           : Active
Used In Workflows: review-analysis, report-generation
Input            : Normalised review dataset
Output           : Sentiment distribution, theme clusters, response quality score
AI Required      : Yes (prompt-driven)
Model-agnostic   : Yes
Last Updated     : 2025-06-01 (sourced from VERSION.md / CHANGELOG.md)
```

**Browse and filter controls:**

| Filter | Options |
|---|---|
| Status | Active / Inactive / Deprecated |
| AI Required | Yes (prompt-driven) / No (deterministic) |
| Workflow | Filter by which workflow uses the skill |
| Skill System | Data Collection / Analysis / Output |

**Skill dependency view:**

Each skill page includes a dependency map showing:
- Which workflows invoke this skill
- Which skills produce the input this skill consumes
- Which skills consume this skill's output

This gives operators a clear picture of the platform's execution graph without needing to read the workflow definition files directly.

**Rules:**
- The Skills Library is always read from `skills/` — it reflects the actual filesystem, not a separate database
- Operators cannot create or modify skills from the dashboard; skills are defined by the engineering team in `skills/`
- Deprecated skills remain visible in the library (marked as Deprecated) until removed from all workflow definitions

---

## Implementation Notes

When the dashboard is built, the following decisions will need to be made:

| Decision | Options | To Be Resolved At |
|---|---|---|
| Frontend framework | Next.js, Vite + React, SvelteKit | Implementation phase |
| Authentication | JWT, session-based, OAuth | Implementation phase |
| API layer | REST, GraphQL, tRPC | Implementation phase |
| Real-time updates | WebSockets, SSE, polling | Implementation phase |
| Deployment target | Cloud, self-hosted, local | Implementation phase |
| Client portal access control | Role-based (Operator / Client) | Implementation phase |

All decisions must maintain model-agnosticism. The dashboard communicates exclusively through `/api` adapters — it never calls AI model APIs directly.

---

*This document is the authoritative specification for the Local Business AI dashboard. Implementation begins in a future phase. No frontend code exists yet.*
