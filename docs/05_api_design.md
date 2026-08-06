# Phase 5 — API Design Specification: MediSphere AI

## 1. RESTful API Architectural Principles

The MediSphere AI backend exposes a RESTful API following standard HTTP semantics, RFC-7807 problem details error models, JWT bearer token security, and strict URI versioning (`/api/v1`).

---

## 2. API Endpoint Matrix

| Method | Endpoint | Description | Auth Required | Scopes |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate staff user & return JWT token | No | Public |
| `GET` | `/api/v1/auth/me` | Return current authenticated user profile | Yes | User |
| `GET` | `/api/v1/dashboard/stats` | High-level system telemetry & live KPIs | Yes | User |
| `GET` | `/api/v1/patients` | List patients with pagination & filtering | Yes | User |
| `POST` | `/api/v1/patients` | Register new patient admission | Yes | Nurse / Admin |
| `GET` | `/api/v1/beds` | Retrieve live ward bed matrix | Yes | User |
| `POST` | `/api/v1/beds/{id}/transfer` | Execute patient bed transfer request | Yes | Nurse / Admin |
| `GET` | `/api/v1/emergency` | Fetch active emergency department triage queue | Yes | User |
| `POST` | `/api/v1/emergency/triage` | Submit new emergency patient triage | Yes | ER Nurse |
| `GET` | `/api/v1/agents/status` | Monitor multi-agent background loop status | Yes | Admin / CMO |
| `POST` | `/api/v1/agents/run-cycle` | Force immediate agent execution cycle | Yes | Admin |
| `GET` | `/health` | Health-check endpoint for load balancers | No | Public |
| `GET` | `/metrics` | Prometheus metrics scrape endpoint | No | Internal |

---

## 3. Pagination, Filtering, and Sorting Standard

All collection endpoints support standardized query parameters:

* `page`: Page index (1-based, default: `1`).
* `limit`: Items per page (default: `20`, max: `100`).
* `sort_by`: Field name to sort (e.g. `created_at`, `esi_level`).
* `order`: `asc` or `desc` (default: `desc`).
* `status`: Filter by status enum (e.g. `Occupied`, `Available`).

### Example Paginated Response Structure
```json
{
  "items": [...],
  "total": 142,
  "page": 1,
  "limit": 20,
  "pages": 8
}
```

---

## 4. OpenAPI Specification & Postman Collection

* **OpenAPI Spec File**: Located at [`docs/openapi.json`](file:///c:/Users/shashidhar%20%20mushike/Downloads/MediSphere%20AI/docs/openapi.json)
* **Postman Collection File**: Located at [`docs/postman_collection.json`](file:///c:/Users/shashidhar%20%20mushike/Downloads/MediSphere%20AI/docs/postman_collection.json)
