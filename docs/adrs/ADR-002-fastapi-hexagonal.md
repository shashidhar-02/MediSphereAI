# ADR-002: Adoption of FastAPI and Hexagonal Architecture

* **Status**: Accepted
* **Date**: 2026-08-06
* **Deciders**: Principal Architect, Backend Lead

## Context & Problem Statement
The backend requires high-performance asynchronous I/O, automatic OpenAPI schema generation, strict type safety, and clear separation of concerns (API Controllers, Domain Services, Repositories).

## Decision Outcome
**Chosen Option**: **FastAPI with Hexagonal (Ports and Adapters) Architecture**.
* **API Layer (`app/api`)**: Translates HTTP requests/responses, performs zero business logic.
* **Service Layer (`app/services`)**: Encapsulates use case domain workflows.
* **Repository Layer (`app/repositories`)**: Isolates data persistence engines (Beanie/Motor).
* **Models Layer (`app/models`)**: Defines core domain entities.

This structure guarantees high unit-testability, zero coupling between HTTP routes and database engines, and simple microservice decomposition if needed.
