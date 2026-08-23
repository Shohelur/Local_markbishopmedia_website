---
name: security-review
description: >
  Guides a structured security review of a production application before release.
  Activate during Phase 15 of the Agency lifecycle, when auditing application
  security, reviewing OWASP compliance, checking for vulnerabilities, or
  producing a security review report.
---

# Skill: Security Review

## Overview
This skill governs the pre-release security review process. It applies the
OWASP Top 10 and additional security checks to ensure the application is safe
to release to production.

## OWASP Top 10 (2021) Checklist

### A01 — Broken Access Control
- [ ] Users cannot access resources/actions beyond their permissions
- [ ] Horizontal privilege escalation tested (user A cannot access user B's data)
- [ ] Vertical privilege escalation tested (regular user cannot access admin functions)
- [ ] Directory traversal tested
- [ ] API endpoints enforce authorization (not just the UI)
- [ ] JWT tokens validated correctly (signature, expiry, claims)

### A02 — Cryptographic Failures
- [ ] Sensitive data identified (PII, credentials, financial, health)
- [ ] All sensitive data encrypted at rest
- [ ] All data transmitted over HTTPS (TLS 1.2+ enforced)
- [ ] No sensitive data in URLs (query strings, path params)
- [ ] Passwords hashed with modern algorithm (bcrypt, Argon2, scrypt)
- [ ] No weak cryptography (MD5, SHA1 for security purposes)
- [ ] Certificates are valid and up to date

### A03 — Injection
- [ ] SQL queries use parameterized queries or ORM (no string concatenation)
- [ ] NoSQL queries validated and sanitized
- [ ] OS command injection not possible
- [ ] LDAP injection tested (if applicable)
- [ ] All user input validated and sanitized before use
- [ ] XML/JSON parsing is safe

### A04 — Insecure Design
- [ ] Security requirements defined in the blueprint/requirements
- [ ] Threat model considered during design
- [ ] Rate limiting on sensitive endpoints (login, registration, password reset)
- [ ] Business logic flaws tested (e.g., price manipulation, quantity bypass)

### A05 — Security Misconfiguration
- [ ] No default credentials remain in place
- [ ] Unnecessary ports, services, and features disabled
- [ ] Error messages do not expose stack traces or internal info in production
- [ ] Security headers configured (CSP, X-Frame-Options, HSTS, etc.)
- [ ] CORS configured correctly (not `*` in production)
- [ ] Debug mode disabled in production
- [ ] Directory listing disabled

### A06 — Vulnerable Components
- [ ] `npm audit` (or equivalent) run — no Critical/High vulnerabilities
- [ ] All dependencies are up to date (within reason)
- [ ] Unlicensed or unknown packages reviewed
- [ ] Container images scanned (if applicable)

### A07 — Authentication Failures
- [ ] Weak password policy prevented
- [ ] Account lockout or rate limiting on login attempts
- [ ] Secure password reset flow (not predictable tokens)
- [ ] "Remember me" functionality is secure
- [ ] Sessions invalidated on logout
- [ ] Session IDs not in URLs
- [ ] MFA available (if required by requirements)

### A08 — Data Integrity Failures
- [ ] Serialization/deserialization is safe
- [ ] No insecure deserialization of user-controlled data
- [ ] Software update integrity verified (signed packages)
- [ ] CI/CD pipeline is secure

### A09 — Logging & Monitoring Failures
- [ ] Authentication events logged (success, failure)
- [ ] Authorization failures logged
- [ ] Input validation failures logged
- [ ] Logs do not contain sensitive data (passwords, credit cards, etc.)
- [ ] Logs are protected from unauthorized access/modification
- [ ] Alerting configured for critical security events

### A10 — Server-Side Request Forgery (SSRF)
- [ ] All server-side HTTP requests use allowlists, not denylists
- [ ] URL parameters that trigger server-side requests are validated
- [ ] Internal network resources not accessible via SSRF
- [ ] Cloud metadata endpoints protected

## Additional Checks

### Secrets Management
- [ ] No hardcoded secrets, API keys, or credentials in code
- [ ] No secrets in Git history (check with `git log -p | grep -i "api_key\|secret\|password"`)
- [ ] All secrets in environment variables or secrets manager
- [ ] `.env` files are in `.gitignore`

### Cookie Security
- [ ] `HttpOnly` flag set on session cookies
- [ ] `Secure` flag set on all cookies
- [ ] `SameSite=Strict` or `SameSite=Lax` set
- [ ] Session cookie expiry is appropriate

### File Upload Security (if applicable)
- [ ] File type validation (not just by extension)
- [ ] File size limits enforced
- [ ] Uploaded files not executable
- [ ] Uploaded files served from separate domain or storage

## Security Review Report Format
```markdown
# Security Review Report — [Project] v[version]
Date: YYYY-MM-DD
Reviewed By: AI Security Review (Agency)

## Summary
[Overview of review coverage and overall security posture]

## Findings

### Critical (Must fix before release)
- [Finding] — [Location] — [Remediation]

### High (Must fix before release)
- [Finding] — [Location] — [Remediation]

### Medium (Fix before release or document exception)
- [Finding] — [Location] — [Remediation]

### Low (Fix in next version)
- [Finding] — [Location] — [Remediation]

### Informational
- [Observation]

## Remediations Applied
- [What was fixed during this review]

## Deferred Items
- [What was deferred and why]

## Sign-off
All Critical and High findings have been resolved.
Product is cleared for release from a security perspective.
```
