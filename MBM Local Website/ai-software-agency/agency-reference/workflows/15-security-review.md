# Phase 15 — Security Review

## Purpose
Systematically audit the application for security vulnerabilities before release.
Security issues found in production are far more expensive than issues found here.

## Role
Security Auditor

## Skill
Load and follow: `.agents/skills/security-review/SKILL.md`

## AI Actions

### OWASP Top 10 Evaluation
Review the application against each OWASP Top 10 category:

1. **Broken Access Control** — Can users access data/actions they shouldn't?
2. **Cryptographic Failures** — Is sensitive data encrypted properly?
3. **Injection** — SQL, NoSQL, OS command injection vulnerabilities?
4. **Insecure Design** — Are security controls built into the design?
5. **Security Misconfiguration** — Default credentials, open ports, verbose errors?
6. **Vulnerable Components** — Outdated or vulnerable dependencies?
7. **Authentication Failures** — Weak passwords, no MFA option, session issues?
8. **Data Integrity Failures** — Unsigned data, insecure deserialization?
9. **Logging Failures** — Are security events logged? Are logs protected?
10. **SSRF** — Can the server be tricked into making unintended requests?

### Additional Review Areas
- **Secrets Management**: No hardcoded secrets, credentials, or API keys in code
- **Input Validation**: All user input validated and sanitized
- **Output Encoding**: XSS prevention
- **CORS Configuration**: Properly configured for production
- **Rate Limiting**: API rate limiting in place
- **Dependency Audit**: Run `npm audit` or equivalent
- **Environment Variables**: Sensitive config in env vars, not in code
- **HTTPS**: TLS enforced everywhere
- **Cookie Security**: httpOnly, Secure, SameSite flags set correctly

### Produce Security Review Report
Create `docs/security/security-review.md` with:
- Summary of review coverage
- Findings (severity: Critical/High/Medium/Low/Info)
- Remediations applied
- Outstanding issues (if any minor ones deferred)

## Completion Criteria
- [ ] OWASP Top 10 reviewed
- [ ] No hardcoded secrets
- [ ] Dependencies audited
- [ ] Critical and High severity findings resolved
- [ ] Security review report committed

## Next Phase
→ `16-staging-uat.md`
