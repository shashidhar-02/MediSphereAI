# Phase 13 — Operations Runbook & Incident Response: MediSphere AI

## 1. Incident Severity Matrix

| Severity Level | Definition | Target Response (MTTD) | Target Resolution (MTTR) | Escalation Path |
| :--- | :--- | :--- | :--- | :--- |
| **SEV-1 (Critical)** | Entire system down; MongoDB database unreachable; ER triage blocked. | < 5 mins | < 30 mins | On-Call Lead -> SRE -> Principal Architect -> CMO |
| **SEV-2 (High)** | Degradation in AI agent background execution loops; bed transfer delays. | < 15 mins | < 2 hours | On-Call SRE -> Backend Lead |
| **SEV-3 (Medium)** | Individual analytics widget latency spike; UI minor display anomaly. | < 1 hour | < 24 hours | On-Call SRE -> Duty Engineer |

---

## 2. Standard Incident Runbooks

### Runbook 1: MongoDB Connection Failure Recovery
1. **Symptom**: HTTP 500 error spikes on API routes; logs output `ServerSelectionTimeoutError`.
2. **Diagnosis**: Check MongoDB Atlas cluster health console. Verify network whitelist IP parameters.
3. **Remediation**:
   * Attempt manual connection string failover to secondary cluster node.
   * If Atlas primary node degraded, trigger Atlas automated failover manually.
   * Restart FastAPI app containers: `docker compose restart backend` or trigger Render service restart.

### Runbook 2: Bed Allocation Concurrency Stalls
1. **Symptom**: Bed status updates returning HTTP 409 Conflict.
2. **Remediation**: Execute bed state synchronization script:
   ```bash
   python -m app.scripts.resync_bed_states
   ```

---

## 3. Disaster Recovery & Capacity Planning
* **Recovery Time Objective (RTO)**: < 15 minutes.
* **Recovery Point Objective (RPO)**: < 5 minutes (via MongoDB Atlas continuous point-in-time recovery).
* **Scaling Strategy**: Horizontal Pod Autoscaler (HPA) or Render auto-scaling triggers when CPU utilization exceeds 75% for 3 consecutive minutes.
