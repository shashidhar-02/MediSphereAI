# Phase 9 — DevSecOps & CI/CD Pipeline: MediSphere AI

## 1. DevSecOps Lifecycle & Architecture

The MediSphere AI DevSecOps framework integrates security scanning at every phase of the CI/CD pipeline.

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Git Push   │───>│ Code Lint & │───>│ Security &  │───>│ Build &     │───>│ Deployment  │
│  Trigger    │    │ Pytest Unit │    │ Secret Scan │    │ Container   │    │ & Rollback  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 2. GitHub Actions Automated Pipeline (`ci-cd.yml`)

The automated workflow executes on all `push` and `pull_request` events targeting `main`:

1. **Lint & Static Analysis**: Runs `flake8` / `ruff` for Python backend, ESLint for Next.js frontend.
2. **Automated Unit & Integration Testing**: Executes `pytest` test suite with code coverage generation (> 85% requirement).
3. **Secret Scanning**: Runs GitLeaks scanner to detect leaked API keys, tokens, or private keys.
4. **Vulnerability & Container Scanning**: Scans Docker container images using **Trivy** for CVE vulnerabilities.
5. **SBOM Generation**: Produces a Software Bill of Materials (SBOM) using **Syft** in SPDX format.
6. **Automated Deployment & Rollback**: Triggers deployment hooks for Vercel and Render upon successful CI verification.

---

## 3. Automated Rollback Strategy
If post-deployment health checks on `/health` return non-200 HTTP response codes within 5 minutes of deployment, Render and Vercel automatically revert traffic to the previous known stable deployment ID.
