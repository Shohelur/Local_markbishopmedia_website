# Phase 17 — Release Approval

## Purpose
Final pre-release checklist, draft `AI-MAINTENANCE.md` creation, and Founder approval before production deployment.

## Role
Release Manager · Senior Software Engineer

## Inputs Required
- Phase 14 Testing results
- Phase 15 Security review
- Phase 16 Staging/UAT sign-off

---

## AI Actions

### Step 0: Produce Draft AI-MAINTENANCE.md (MANDATORY BEFORE GATE-05)
Before presenting the GATE-05 checklist:
1. Produce a complete draft of `docs/AI-MAINTENANCE.md` using `.agents/plugins/ai-software-agency/agency-reference/templates/ai-maintenance-guide.md`.
2. Ensure it accurately reflects the as-built production architecture, environment configuration, deployment steps, and known issues.
3. This draft is reviewed as part of GATE-05 and finalized in Phase 19.

---

### Step 1: Pre-Release Verification Checklist
Verify ALL of the following before presenting GATE-05:

**Gates & Traceability**
- [ ] GATE-01 through GATE-04 — APPROVED
- [ ] `docs/REQUIREMENTS.md` verified current (all FR-NNN requirements accounted for)

**Testing & Quality**
- [ ] All automated tests passing (verified with execution log)
- [ ] No open critical/high bugs
- [ ] Security review complete — zero critical/high vulnerabilities open

**UAT & Staging**
- [ ] UAT conducted in staging environment
- [ ] UAT sign-off recorded in `docs/DECISIONS.md`

**Documentation & Maintenance**
- [ ] Draft `docs/AI-MAINTENANCE.md` complete and readable
- [ ] `docs/ARCHITECTURE.md` up to date with as-built state
- [ ] Release notes prepared: `docs/release-notes/v1.0.0.md`
- [ ] `docs/PROJECT.md` updated with Phase 17 status

**Deployment & Git**
- [ ] Pre-release recovery checkpoint committed on `staging`:
      `git commit -m "checkpoint(<project>): pre-release v1.0.0 stable state"`
- [ ] Deployment and rollback procedures verified in staging

---

### Step 2: Produce Release Notes
Produce `docs/release-notes/v1.0.0.md`:
- Version number and release date
- Features included (tracing to FR-NNN requirements)
- Known limitations and technical debt
- Environment prerequisites

---

## ⚠️ Approval Gate: GATE-05

```
╔══════════════════════════════════════════════════════════╗
║  🔒 APPROVAL GATE: GATE-05 — Release Approval           ║
║                                                          ║
║  Phase Completed: Release Approval (Phase 17)            ║
║  Pre-release checklist: ALL ITEMS VERIFIED               ║
║  Draft AI-MAINTENANCE.md: CREATED & REVIEWED             ║
║                                                          ║
║  Releasing to production is IRREVERSIBLE without         ║
║  a rollback. Please confirm all items above are clear.   ║
║                                                          ║
║  Reply APPROVED to trigger production release.           ║
║  Reply with concerns to delay release.                   ║
╚══════════════════════════════════════════════════════════╝
```

**Upon Approval:**
- Record in `docs/DECISIONS.md`
- Tag Git: `<project>/v1.0.0`
- Proceed to Phase 18 (Production Release)

---

## Next Phase
→ `18-production-release.md`
