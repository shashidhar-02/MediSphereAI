# Phase 4 — Database Design & Schema Specification: MediSphere AI

## 1. Database Architecture & Overview

MediSphere AI uses **MongoDB Atlas** as its primary document store, managed asynchronously using Python's **Motor** client and **Beanie ODM** (Object Document Mapper).

* **Database Name**: `medisphere_db`
* **Collection Strategy**: Multi-collection document model enforcing relational integrity via ObjectIds and normalized indexing strategies.

---

## 2. Collection Schemas

### 2.1 `users` Collection
Stores staff accounts, hashed credentials, roles, and authorization scopes.

```json
{
  "_id": "ObjectId('66b1a5e2f12a4b8c9d0e1f01')",
  "email": "dr.vance@medisphere.ai",
  "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$...",
  "full_name": "Dr. Elena Vance",
  "role": "CHIEF_MEDICAL_OFFICER",
  "department": "Executive Operations",
  "is_active": true,
  "last_login": "2026-08-06T10:30:00Z",
  "created_at": "2026-01-15T08:00:00Z"
}
```

### 2.2 `patients` Collection
Stores patient demographics, clinical triage status, admission state, and assigned bed IDs.

```json
{
  "_id": "ObjectId('66b1a5e2f12a4b8c9d0e1f02')",
  "mrn": "MRN-2026-8841",
  "full_name": "Eleanor Vance",
  "age": 42,
  "gender": "Female",
  "blood_type": "O+",
  "admission_status": "Admitted",
  "assigned_ward": "ICU-A",
  "assigned_bed_id": "BED-ICU-04",
  "esi_level": 2,
  "vital_signs": {
    "heart_rate": 110,
    "blood_pressure": "145/92",
    "spo2": 94,
    "temperature_celsius": 38.5
  },
  "admission_time": "2026-08-06T09:15:00Z",
  "created_at": "2026-08-06T09:15:00Z"
}
```

### 2.3 `beds` Collection
Tracks individual hospital bed capacity, operational state, ward assignment, and maintenance schedules.

```json
{
  "_id": "ObjectId('66b1a5e2f12a4b8c9d0e1f03')",
  "bed_number": "BED-ICU-04",
  "ward": "ICU-A",
  "status": "Occupied",
  "bed_type": "Intensive Care Unit",
  "current_patient_id": "ObjectId('66b1a5e2f12a4b8c9d0e1f02')",
  "is_telemetry_monitored": true,
  "last_cleaned_at": "2026-08-06T08:30:00Z",
  "maintenance_due": "2026-09-01T00:00:00Z"
}
```

### 2.4 `emergency_triages` Collection
Log of all ER check-ins, vital sign progression, risk scores, and clinical alerts.

```json
{
  "_id": "ObjectId('66b1a5e2f12a4b8c9d0e1f04')",
  "patient_mrn": "MRN-2026-8841",
  "chief_complaint": "Acute chest pain & dyspnea",
  "esi_score": 2,
  "triage_nurse_id": "ObjectId('66b1a5e2f12a4b8c9d0e1f01')",
  "triage_timestamp": "2026-08-06T09:10:00Z",
  "risk_factors": ["Hypertension", "Tachycardia"],
  "status": "Assigned"
}
```

---

## 3. Indexing Strategy

To guarantee API query execution times under 50ms, MongoDB Atlas indexes are configured as follows:

| Collection | Index Specifications | Index Type | Purpose |
| :--- | :--- | :--- | :--- |
| `users` | `{ "email": 1 }` | Unique | Fast authentication lookup & email collision prevention. |
| `patients` | `{ "mrn": 1 }` | Unique | Instant patient record retrieval by Medical Record Number. |
| `patients` | `{ "admission_status": 1, "assigned_ward": 1 }` | Compound | Rapid ward occupancy querying and patient filtering. |
| `beds` | `{ "ward": 1, "status": 1 }` | Compound | Fast query for available beds per ward. |
| `beds` | `{ "bed_number": 1 }` | Unique | Prevents duplicate bed identification numbers. |
| `emergency_triages` | `{ "triage_timestamp": -1, "esi_score": 1 }` | Compound | High-priority ER queue sorting and telemetry timeline retrieval. |

---

## 4. Aggregation Strategies

### 4.1 Ward Occupancy Summary Aggregation Pipeline
```javascript
db.beds.aggregate([
  {
    $group: {
      _id: "$ward",
      total_beds: { $sum: 1 },
      occupied_beds: {
        $sum: { $cond: [{ $eq: ["$status", "Occupied"] }, 1, 0] }
      },
      cleaning_beds: {
        $sum: { $cond: [{ $eq: ["$status", "Cleaning"] }, 1, 0] }
      },
      available_beds: {
        $sum: { $cond: [{ $eq: ["$status", "Available"] }, 1, 0] }
      }
    }
  },
  {
    $project: {
      ward: "$_id",
      total_beds: 1,
      occupied_beds: 1,
      available_beds: 1,
      occupancy_rate_pct: {
        $multiply: [{ $divide: ["$occupied_beds", "$total_beds"] }, 100]
      }
    }
  }
])
```

---

## 5. Backup, Migration & Lifecycle Strategy

1. **Backup Strategy**: Automated daily snapshots on MongoDB Atlas with 30-day point-in-time recovery (PITR) retention.
2. **Data Lifecycle & Retention**:
   * Operational data (Patients, Active Beds, Current Staff) retained indefinitely.
   * Telemetry logs and agent execution traces auto-archived after 90 days to cold storage (MongoDB Atlas Data Lake).
3. **Migration Strategy**: Beanie ODM document schema migrations are managed via versioned migration scripts stored in `database/migrations/`.
