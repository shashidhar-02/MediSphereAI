# ADR-001: Selection of MongoDB Atlas as Primary Document Store

* **Status**: Accepted
* **Date**: 2026-08-06
* **Deciders**: Principal Architect, Database Architect, Backend Lead

## Context & Problem Statement
MediSphere AI requires a high-throughput, flexible data store capable of handling heterogeneous healthcare data (patients, telemetry, beds, lab orders, equipment statuses) with schema fluidity and horizontal scale.

## Decision Drivers
* Dynamic schema flexibility for evolving clinical entity models.
* Native JSON document support matching FastAPI Pydantic v2 schemas.
* Built-in high-availability, automatic failover, and automated backups via MongoDB Atlas cloud.
* High asynchronous read/write performance using Motor and Beanie ODM.

## Considered Options
1. **MongoDB Atlas (Document Store)** — Selected
2. PostgreSQL (Relational JSONB)
3. DynamoDB (AWS Proprietary NoSQL)

## Decision Outcome
**Chosen Option**: **MongoDB Atlas**, because it offers seamless asynchronous Motor driver integration in Python 3.14, clean Beanie ODM object modeling, multi-region replication, and native geospatial/compound indexing capabilities.
