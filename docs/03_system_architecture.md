# Phase 3 — System Architecture Document: MediSphere AI

## 1. High-Level Architecture (HLD)

MediSphere AI is designed as a **Modular Monolith** applying **Domain-Driven Design (DDD)** and **Hexagonal Architecture (Ports and Adapters)**. 

The application architecture separates presentation (Next.js 15 App Router), API routing (FastAPI Controllers), business domain logic (Services), multi-agent intelligence orchestration (Agent Engine), and persistence (MongoDB Atlas, Upstash Redis, Qdrant Cloud).

---

## 2. C4 Model Diagrams

### 2.1 System Context Diagram (Level 1)

```mermaid
C4Context
    title System Context Diagram — MediSphere AI
    
    Person(cmo, "Chief Medical Officer", "Monitors overall hospital operations, throughput, and strategic KPIs.")
    Person(nurse, "Nurse Coordinator", "Manages bed transfers, ward capacity, and patient check-ins.")
    Person(er_lead, "ER Operations Lead", "Coordinates emergency triage, ambulance surges, and ICU transfers.")
    
    System(medisphere, "MediSphere AI Platform", "Real-time hospital operations intelligence & multi-agent system.")
    
    System_Ext(ehr, "Legacy EHR System", "Electronic Health Records database (Epic / Cerner).")
    System_Ext(lis, "Lab Info System (LIS)", "Laboratory diagnostics provider.")
    
    Rel(cmo, medisphere, "Views executive dashboards & operational analytics", "HTTPS")
    Rel(nurse, medisphere, "Performs bed allocations & ward transfers", "HTTPS")
    Rel(er_lead, medisphere, "Monitors triage queues & vital alerts", "HTTPS")
    
    Rel(medisphere, ehr, "Syncs patient demographic data", "HL7 / FHIR REST")
    Rel(medisphere, lis, "Receives lab order results", "HL7 / REST")
```

---

### 2.2 Container Diagram (Level 2)

```mermaid
C4Container
    title Container Diagram — MediSphere AI
    
    Container(frontend, "Frontend Dashboard", "Next.js 15, React 18, Tailwind CSS", "Provides responsive UI for hospital staff, bed maps, triage boards.")
    Container(api_gateway, "Backend API Service", "Python 3.14, FastAPI, Uvicorn", "Handles REST endpoints, auth, business services, validation.")
    Container(agent_engine, "AI Multi-Agent Engine", "LangChain, APScheduler, Python", "Executes background analysis loops across domain agents.")
    
    ContainerDb(mongo, "Primary Database", "MongoDB Atlas", "Stores patient records, beds, staff rosters, telemetry history.")
    ContainerDb(redis, "Cache & Session Store", "Upstash Redis", "Caches hot metrics, API sessions, agent status flags.")
    ContainerDb(qdrant, "Vector Database", "Qdrant Cloud", "Stores clinical knowledge embeddings for RAG reasoning.")
    
    Rel(frontend, api_gateway, "API Requests", "JSON / HTTPS / WSS")
    Rel(api_gateway, mongo, "Reads/Writes Entity Documents", "Motor / Async I/O")
    Rel(api_gateway, redis, "Caches Query Results & Rate Limits", "RESP / Redis protocol")
    Rel(agent_engine, mongo, "Queries Operational States", "Motor")
    Rel(agent_engine, qdrant, "Similarity Search for Protocols", "gRPC / HTTPS")
    Rel(api_gateway, agent_engine, "Triggers Agent Actions", "In-Process Async Loop")
```

---

### 2.3 Component Diagram (Level 3 — Backend API)

```mermaid
graph TD
    subgraph FastAPI Application
        Router[API Controllers / Routers]
        AuthMW[JWT Security Middleware]
        LogMW[Structured Logging Middleware]
        
        subgraph Domain Services
            BedSvc[Bed Intelligence Service]
            EmgSvc[Emergency Triage Service]
            PatSvc[Patient Service]
            AgtSvc[Agent Orchestration Service]
        end
        
        subgraph Repository Layer
            BedRepo[Bed Repository]
            PatRepo[Patient Repository]
            CoreRepo[Core Repository]
        end
        
        subgraph AI Agent Mesh
            BedAgent[Bed Intelligence Agent]
            EmgAgent[Emergency Response Agent]
            FlowAgent[Patient Flow Agent]
        end
    end
    
    Router --> AuthMW
    AuthMW --> LogMW
    LogMW --> BedSvc & EmgSvc & PatSvc
    
    BedSvc --> BedRepo
    PatSvc --> PatRepo
    EmgSvc --> CoreRepo
    
    AgtSvc --> BedAgent & EmgAgent & FlowAgent
    BedAgent & EmgAgent & FlowAgent --> BedSvc & EmgSvc
```

---

## 3. Sequence Diagrams

### 3.1 Emergency Patient Admission & Automated Triage Sequence

```mermaid
sequenceDiagram
    autonumber
    actor ER_Nurse as ER Nurse / Staff
    participant UI as Next.js Dashboard
    participant API as FastAPI Backend
    participant EmgSvc as Emergency Service
    participant EmgAgent as Emergency Agent
    participant BedAgent as Bed Intelligence Agent
    participant DB as MongoDB Atlas
    
    ER_Nurse->>UI: Submit Patient Triage Form (Vitals, ESI 2)
    UI->>API: POST /api/v1/emergency/triage
    API->>EmgSvc: Process Triage Submission
    EmgSvc->>DB: Save Patient Record & Triage State
    EmgSvc-->>API: Triage Processed (ID: PAT-9921)
    API-->>UI: 201 Created (Triage Confirmed)
    
    par Async Agent Loop Evaluation
        EmgSvc->>EmgAgent: Trigger Immediate Triage Evaluation
        EmgAgent->>BedAgent: Query Available ICU / Step-Down Beds
        BedAgent->>DB: find_available_beds(ward="ICU")
        DB-->>BedAgent: Bed BED-ICU-02 Available
        BedAgent-->>EmgAgent: Reserved Bed BED-ICU-02
        EmgAgent->>DB: Emit Alert & Reserve Bed
    end
```

---

## 4. Architecture Decision Records Summary

| ADR ID | Title | Selected Technology | Rationale |
| :--- | :--- | :--- | :--- |
| **ADR-001** | Primary Document Store | MongoDB Atlas | Schema flexibility, native async Motor support, high availability. |
| **ADR-002** | Web Framework & Architecture | FastAPI + Hexagonal DDD | Pure async performance, Pydantic validation, explicit layer separation. |
| **ADR-003** | Agent Orchestration Engine | APScheduler + LangChain | Lightweight async event loop, deterministic agent coordination. |
| **ADR-004** | Vector Database Engine | Qdrant Cloud | High-speed HNSW indexing, cloud multi-tenancy, gRPC performance. |
| **ADR-005** | Authentication Scheme | JWT + Argon2id | OWASP compliant stateless auth, brute-force resistant password hashing. |
