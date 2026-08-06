# 🏥 MediSphere AI: Enterprise Hospital Operations Intelligence

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Security Rating](https://img.shields.io/badge/security-A+-success)](#)
[![Architecture](https://img.shields.io/badge/architecture-Modular%20Monolith-blue)](#)
[![Docker Support](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)](#)

> **Enterprise-grade, Multi-Agent AI Platform for proactive hospital operations, resource management, and intelligent patient flow forecasting.**

## 🎯 Executive Summary

MediSphere AI is a production-ready, cloud-native application designed to transition hospital management from reactive responses to proactive, AI-assisted decision-making. 

Built strictly adhering to **SOLID**, **DRY**, and **Clean Architecture** principles, the platform integrates predictive analytics, real-time telemetry, and multi-agent orchestration to manage beds, emergency response, and clinical workflows.

---

## 🏛️ System Architecture

The application is designed as a **Modular Monolith** leveraging **Domain-Driven Design (DDD)** and **Hexagonal Architecture (Ports and Adapters)**. This ensures separation of concerns, high testability, and a clear migration path to microservices if required in the future.

### Architecture Diagram

```mermaid
graph TD
    UI[Frontend: Next.js 15] --> API[Backend API: FastAPI]
    API --> Services[Domain Services]
    Services --> Repos[Repository Layer]
    
    Repos --> Mongo[(MongoDB Cluster)]
    Repos --> Cache[(Redis Cache)]
    Repos --> VectorDB[(Qdrant Vector DB)]
    
    Services --> Agents[AI Agent Orchestrator]
    Agents --> LLM[Local/Cloud LLMs]
```

### Technology Stack

* **Frontend UI**: Next.js 15, React 18, Tailwind CSS, Lucide Icons, Recharts.
* **Backend Core**: Python 3.14, FastAPI, Uvicorn, Pydantic v2.
* **Database**: MongoDB (NoSQL) utilizing the asynchronous `Motor` engine and `Beanie` ODM.
* **Caching & Queues**: Redis 7.
* **AI & Vector Search**: Qdrant Vector DB, LangChain, Ollama.
* **Security**: Argon2 Password Hashing, JWT (JSON Web Tokens), Role-Based Access Control (RBAC).
* **Observability**: Structured Logging (`loguru`), Application Tracing, Health endpoints.
* **DevOps**: Docker, Docker Compose.

---

## 🔒 Enterprise Security & Quality Gates

MediSphere AI enforces strict production-level quality gates:
1. **Authentication:** Stateless JWT-based authentication using HS256 signatures.
2. **Cryptography:** Argon2id hashing algorithms for secure credential storage (OWASP compliant).
3. **Data Validation:** Strict Pydantic v2 schemas at all API boundaries to prevent injection attacks.
4. **Environment Isolation:** Secrets and URIs are exclusively injected via strict Environment Variables.

---

## 🚀 Local Development & Execution

To ensure cross-platform compatibility (especially for Windows environments executing Python C-extensions), the application is orchestrated entirely via **Docker**.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running.
* Git

### 1. Environment Configuration

Clone the repository and configure your environment variables. The backend requires a valid MongoDB Atlas connection string.

```bash
git clone https://github.com/your-org/medisphere-ai.git
cd "MediSphere AI"

# Create the backend environment file
touch backend/.env
```

Add the following variables to your `backend/.env` file:

```env
# Database
MONGODB_URI=mongodb+srv://2303a52291_db_user:nPxAqk5aS7iPo8QI@cluster0.rw2skdf.mongodb.net/
MONGODB_DB_NAME=medisphere_db

# Security (Change in production!)
SECRET_KEY=a_very_secure_long_random_string_for_jwt_signing
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# AI Configuration
QDRANT_HOST=qdrant
QDRANT_PORT=6333
REDIS_URL=redis://redis:6379/0
```

### 2. Orchestrating with Docker Compose

Build and launch the entire enterprise stack using Docker Compose. This single command will spin up the FastAPI Backend, Next.js Frontend, Redis cache, and Qdrant Vector database.

```bash
docker compose up -d --build
```

### 3. Verify Deployment

Ensure all containers are running and healthy:

```bash
docker compose ps
docker compose logs -f
```

### 4. Access the Platform

* **Frontend Dashboard**: `http://localhost:3000`
* **Backend API Docs (Swagger)**: `http://localhost:8000/docs`
* **Backend API Health**: `http://localhost:8000/api/v1/health`

---

## 🛠️ Engineering Best Practices

When contributing to this repository, adhere strictly to the following software engineering best practices:

### Clean Architecture Layers
1. **API Layer (`app/api/`)**: Controllers. Strictly handles HTTP routing, request parsing, and response formatting. Contains NO business logic.
2. **Service Layer (`app/services/`)**: Use Cases. Contains all core business logic and orchestrates domain operations.
3. **Repository Layer (`app/repositories/`)**: Data Access. Encapsulates all database queries (`Beanie` / `Motor`). The Service layer should never import database models directly.
4. **Domain Layer (`app/models/` & `app/schemas/`)**: Entities. Defines the shape of the data and Pydantic validation rules.

### Code Quality Rules
* **Type Hinting**: All Python functions must include strict type hints for arguments and return types.
* **No `any` in TypeScript**: The frontend UI strictly enforces type safety. Do not use `any` or bypass the ESLint rules.
* **Asynchronous I/O**: All database transactions, network requests, and file I/O must be non-blocking `async`/`await`.
* **DRY (Don't Repeat Yourself)**: Extract reusable logic into helper utilities (`lib/` in frontend, `core/` in backend).

---

## 📊 Dashboard Modules

| Module | Route | Enterprise Function |
|--------|-------|---------------------|
| **Executive Overview** | `/dashboard` | High-level telemetry, live KPIs, AI agent statuses. |
| **Bed Intelligence** | `/dashboard/beds` | Ward capacity mapping and predictive patient transfer analysis. |
| **Patient Flow** | `/dashboard/patients` | Real-time queue telemetry and bottleneck identification. |
| **Emergency Response**| `/dashboard/emergency`| Triage prioritization, vital sign tracking, and wait time alerts. |

---

*Engineered with strict adherence to Enterprise Standards for High Availability and Clean Architecture.*
