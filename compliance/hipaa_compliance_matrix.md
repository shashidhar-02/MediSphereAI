# HIPAA Security & Privacy Compliance Matrix — MediSphere AI

## Technical Safeguards (§ 164.312)

| Requirement | Implementation Mechanism | Verification |
| :--- | :--- | :--- |
| **Access Control (a)(1)** | Unique user IDs, Role-Based Access Control (RBAC), JWT Bearer Token expiration. | Automated unit tests on `auth.py`. |
| **Transmission Security (e)(1)** | TLS 1.3 encryption in transit for all REST API and WebSocket traffic. | Security scan & SSL probe checks. |
| **Audit Controls (b)** | Immutable MongoDB append-only log events recording user ID, action, timestamp, and target entity. | Loguru audit logging middleware. |
| **Integrity Controls (c)(1)** | HMAC-SHA256 digital signature validation on JWT tokens and API requests. | Auth security tests. |
| **Encryption at Rest (a)(2)(iv)** | AES-256 volume encryption on MongoDB Atlas clusters and Redis instances. | Cloud infrastructure policy audit. |
