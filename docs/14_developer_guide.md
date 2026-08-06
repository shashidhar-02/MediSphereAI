# Phase 14 — Developer & System Architecture Guide: MediSphere AI

## 1. Local Development Setup

### Prerequisites
* Python 3.14+
* Node.js 20+ & `npm`
* Docker Desktop & Git

### Quickstart Execution
1. Clone repository and install dependencies:
   ```bash
   git clone https://github.com/your-org/medisphere-ai.git
   cd "MediSphere AI"
   ```
2. Start local multi-container development environment:
   ```bash
   docker compose up -d --build
   ```
3. Access local endpoints:
   * Frontend Web UI: `http://localhost:3000`
   * Backend Swagger API Docs: `http://localhost:8000/docs`
   * Backend Metrics Telemetry: `http://localhost:8000/metrics`

---

## 2. Contribution Guidelines & Branching Strategy

* **Git Flow**: All development occurs on feature branches (`feature/feature-name`) or hotfix branches (`hotfix/issue-description`).
* **Commit Conventions**: Standard Conventional Commits:
  * `feat:` New feature addition
  * `fix:` Bug fix
  * `docs:` Documentation updates
  * `sec:` Security improvements
* **Pull Request Requirements**: Minimum 1 peer review approval + 100% passing CI build checks.
