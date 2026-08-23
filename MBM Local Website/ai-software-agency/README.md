# AI Software Agency — Antigravity IDE Plugin

> **Plugin Name:** `ai-software-agency`  
> **Version:** `1.2.0`  
> **Installation Scope:** Workspace-Level ONLY (`<project>\.agents\plugins\ai-software-agency\`)  
> **Global Installation:** STRICTLY PROHIBITED (Do NOT place in `~/.gemini/config/plugins/`)

---

## Overview

The **AI Software Agency Plugin** packages the reusable AI Software Agency engine into a portable, workspace-installable plugin for Antigravity IDE.

When installed into a target software project workspace, this plugin governs the complete professional product development lifecycle:

```
 1. Problem Discovery       12. Implementation Plan [GATE-04]
 2. Research                13. Production Development (Layer 1–4 Skills)
 3. Business Strategy       14. Testing / QA
 4. Product Strategy        15. Security Review
 5. Requirements            16. Staging / UAT
 6. Product Blueprint [GATE-01]  17. Release Approval [GATE-05]
 7. UX / User Flows         18. Production Release
 8. HTML Prototype          19. Documentation
 9. Founder Review [GATE-02] 20. AI Maintenance
10-11. Tech Architecture +  21. Future Iterations
       Tech Eval [GATE-03]
```

---

## Key Features & Governance

- 🔒 **Absolute Pre-Code Lock:** Production code creation (`src/`) is locked until GATE-01, GATE-02, GATE-03, and GATE-04 are ALL explicitly `APPROVED` by the Founder.
- ⚡ **Prototype vs. Production Boundary:** Prototypes (`prototype/`) are pure HTML5/CSS3/vanilla JS (mock data, no real DB/API/auth). Production code uses real frameworks, real DB, real auth, and real APIs.
- 🛠️ **4-Layer Engineering Architecture:** Layer 1 Core (`production-engineering`, `api-integration`, `database-engineering`), Layer 2 Platform (`web-frontend-dev`, `web-backend-dev`, `mobile-app-dev`, `cli-service-dev`, `ai-application-development`), Layer 3 Tech Stack (`tech-nextjs`, `tech-react`, `tech-python-fastapi`, `tech-postgresql`, `tech-react-native`, `tech-supabase`), Layer 4 Quality (`testing-qa`, `security-review`, `git-workflow`, `ai-maintenance`).
- 🎯 **On-Demand Tech Skill Loading:** Technology skills are loaded dynamically ONLY when approved in GATE-03 (`docs/ARCHITECTURE.md`).
- 📋 **Missing Tech Skill Protocol:** Gracefully handles approved tech lacking dedicated skills using Layer 1 & 2 skills, logging recommendations without inventing fake skills or blocking projects.

---

## Windows Installation Instructions

To install this plugin into any software project workspace (`C:\Projects\MyClientApp`):

### Option A: Windows PowerShell (Recommended)

```powershell
# 1. Open PowerShell and navigate to your client project directory
cd "C:\Projects\MyClientApp"

# 2. Create the workspace plugin folder structure
New-Item -ItemType Directory -Force -Path ".agents\plugins\ai-software-agency"

# 3. Copy the plugin package into your project workspace
Copy-Item -Recurse -Force -Path "E:\AI Agent S\dist\plugins\ai-software-agency\*" -Destination ".agents\plugins\ai-software-agency\"
```

### Option B: Windows Command Prompt (cmd.exe)

```cmd
cd /d "C:\Projects\MyClientApp"
mkdir ".agents\plugins\ai-software-agency"
xcopy /E /I /Y "E:\AI Agent S\dist\plugins\ai-software-agency" ".agents\plugins\ai-software-agency"
```

---

## Verification of Activation

1. Open `C:\Projects\MyClientApp` in Antigravity IDE.
2. The IDE automatically discovers `.agents\plugins\ai-software-agency\plugin.json` and loads native `rules/` and `skills/`.
3. In chat, ask the AI assistant:
   > *"What is your role and active ruleset?"*
4. The AI will respond identifying as the **AI Software Agency v1.2.0** loaded from `.agents\plugins\ai-software-agency\`.

---

## Plugin Removal Instructions

To remove the Agency plugin from a project workspace:

### Windows PowerShell:
```powershell
Remove-Item -Recurse -Force -Path ".agents\plugins\ai-software-agency"
```

---

## Repository & Package Architecture

- **Agency Source Repository:** `E:\AI Agent S\` (Version-controlled source of truth, tag `agency/v1.2.0`)
- **Plugin Distribution Package:** `E:\AI Agent S\dist\plugins\ai-software-agency\`
- **Target Project Workspace:** `<project>\.agents\plugins\ai-software-agency\`

---

## Updating to Future Agency Versions

When a new version of the Agency is released (e.g. `v1.3.0`):
1. Build the updated plugin package in the source repository (`python scripts/package-plugin.py`).
2. Re-run the installation PowerShell command in your project workspace to overwrite `.agents\plugins\ai-software-agency\` with the new version.
3. Existing project memory files (`docs/PROJECT.md`, `docs/DECISIONS.md`, `docs/REQUIREMENTS.md`) in your project remain 100% untouched.
