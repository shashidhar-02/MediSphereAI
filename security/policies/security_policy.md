# Security Governance Policy — MediSphere AI

## 1. Secrets Management Policy
* Zero plain-text credentials, passwords, or API keys allowed in version control.
* All secrets MUST be injected via Environment Variables in container deployment environments.
* GitLeaks secret scanning runs automatically on every Git commit and PR.

## 2. Password & Key Hashing Policy
* User passwords MUST be hashed using the **Argon2id** algorithm (`passlib[argon2]`).
* JWT signing secret keys MUST have a minimum entropy of 256 bits (32 bytes).

## 3. Vulnerability Patch Management
* High and Critical CVE vulnerabilities identified by Trivy container scans MUST be remediated within 7 days.
* Dependabot runs weekly dependency updates across Python and Node.js ecosystems.
