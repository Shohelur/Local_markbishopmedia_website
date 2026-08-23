---
name: cli-service-dev
description: >
  Production CLI tools, daemon services, background workers, and microservices development.
  Activate when implementing command-line interfaces, background daemons, worker processes,
  or gRPC services in Phase 13.
---

# Skill: CLI & Service Development (Layer 2 Platform)

## Purpose
Governs the implementation of production command-line tools, background daemons, worker services, and standalone backend utilities during Phase 13.

---

## CLI & Service Standards

### 1. CLI User Experience & Argument Parsing
- Use standard CLI parsing libraries (Cobra, Click, Argparse, Commander, Clack).
- Support standard flags (`--help`, `-h`, `--version`, `-v`, `--verbose`, `--quiet`, `--json`).
- Provide human-readable terminal output (spinners, colorized status, progress bars) AND machine-readable output (`--json`).
- Return standard POSIX exit codes (`0` = success, `1` = general error, `2` = usage error).

### 2. Daemon & Background Worker Lifecycle
- Support graceful shutdown handling OS termination signals (`SIGINT`, `SIGTERM`).
- Drain active tasks and finish pending writes before process exit.
- Provide health-check endpoints or status probes (`/healthz`).

### 3. I/O Efficiency & Concurrency
- Use streaming I/O for processing large files or pipelines (avoid loading multi-gigabyte files into memory).
- Manage concurrency using worker pools, goroutines, or async task loops with rate-limiting controls.
