# Phase 7 — Backend Architecture & Service Layer: MediSphere AI

## 1. Backend Service Principles
The backend is built in **Python 3.14** using **FastAPI**, **Pydantic v2**, and **Async Motor / Beanie ODM**. It follows strict Hexagonal Architecture principles:

1. **API Router Layer (`app/api/v1/`)**: Pure controller routing, request parameter validation, and HTTP response mapping.
2. **Domain Service Layer (`app/services/`)**: Encapsulates core business workflows, validation rules, and agent notifications.
3. **Repository Layer (`app/repositories/`)**: Data access abstractions over MongoDB Atlas.
4. **Agent Mesh Layer (`app/agents/`)**: Asynchronous multi-agent evaluation engine powered by `APScheduler` and `LangChain`.

---

## 2. Core Services Breakdown

* **`HospitalService`**: Manages patient admission, ward capacity calculations, and patient transfer validations.
* **`EmergencyService`**: Calculates ESI scores, vital sign anomaly detection, and priority triage ordering.
* **`ResourceService`**: Monitors equipment state, maintenance scheduling, and pharmacy stock thresholds.
* **`FinanceService`**: Revenue cycle tracking, billing dispatch, and insurance claim validation.
* **`AgentOrchestrator`**: Background engine managing 14 autonomous agents operating in cyclical evaluation turns.

---

## 3. Asynchronous Execution & Non-Blocking Design
All database queries, external vector searches, and agent iterations use non-blocking `async`/`await` primitives. No synchronous blocking calls exist on main event loops.
