# Phase 8 — Security Architecture & Threat Model: MediSphere AI

## 1. Threat Modeling (STRIDE Framework)

| STRIDE Threat | Risk Description | System Mitigation |
| :--- | :--- | :--- |
| **Spoofing** | Unauthorized user attempting to impersonate a physician or nurse coordinator. | Argon2id credential hashing, stateless JWT with 24-hour expiration & HMAC-SHA256 signatures. |
| **Tampering** | Modification of bed transfer logs or patient ESI triage scores in transit. | TLS 1.3 enforced for all client-to-server traffic; payload HMAC verification. |
| **Repudiation** | User denying having authorized a patient bed transfer or discharge. | Immutable MongoDB append-only audit logging for all status mutation actions. |
| **Information Disclosure** | Exposure of PII/PHI in server log files or error traces. | Structured logging middleware strips sensitive headers, tokens, and PII fields automatically. |
| **Denial of Service** | Volumetric flooding of emergency triage API endpoints. | Redis-backed token bucket rate limiting (100 req/min per IP); GZip response compression. |
| **Elevation of Privilege** | Standard nurse user attempting administrative agent execution commands. | Mandatory FastAPI Role-Based Access Control (`RBAC`) dependencies validating JWT role claims. |

---

## 2. OWASP Top 10 Mitigation Matrix

1. **A01:2021 — Broken Access Control**:
   * Enforced via strict `@requires_role(["ADMIN", "CHIEF_MEDICAL_OFFICER"])` decorators at FastAPI endpoint handlers.
2. **A02:2021 — Cryptographic Failures**:
   * Sensitive credentials hashed via OWASP-recommended **Argon2id** algorithm (`time_cost=3, memory_cost=65536, parallelism=4`).
3. **A03:2021 — Injection**:
   * No raw SQL or un-escaped NoSQL queries. All database operations execute through **Pydantic v2** typed schemas and **Beanie ODM** parameterized queries.
4. **A05:2021 — Security Misconfiguration**:
   * CORS policy strictly restricts origins to trusted domains (`ALLOWED_ORIGINS`). Strict security headers set via Next.js Vercel headers (CSP, HSTS, X-Content-Type-Options).
5. **A09:2021 — Security Logging and Monitoring Failures**:
   * Structured JSON log aggregation via `loguru` with immediate alert triggers for failed authentication sprees or 5xx server errors.

---

## 3. RBAC Matrix

| Role | Read Dashboards | Bed Transfer | Patient Admission | Force Agent Execution | User Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **ADMIN** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **CHIEF_MEDICAL_OFFICER** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **NURSE_MANAGER** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **STAFF_PHYSICIAN** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **AUDITOR** | ✅ | ❌ | ❌ | ❌ | ❌ |
