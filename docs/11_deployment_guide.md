# Phase 11 — Deployment Guide & Multi-Cloud Target Blueprint: MediSphere AI

## 1. Cloud Architecture Overview

MediSphere AI is deployed across enterprise multi-cloud target providers:

* **Frontend Web Application**: Vercel (Edge Network Deployment)
* **Backend API & Multi-Agent Mesh**: Render (Docker Container Web Service)
* **Primary Database**: MongoDB Atlas (Dedicated M10+ Cluster, AWS us-east-1)
* **Cache & Session Management**: Upstash Redis (Serverless Redis REST/RESP)
* **Vector Store**: Qdrant Cloud (Managed Vector Database)

---

## 2. Deployment Blueprint & Step-by-Step Execution

### 2.1 Backend Deployment on Render (`backend/render.yaml`)
1. Connect GitHub repository to Render Dashboard.
2. Select **Blueprint** and link `backend/render.yaml`.
3. Configure the following Production Environment Variables in Render:
   * `ENVIRONMENT`: `production`
   * `DEBUG`: `False`
   * `MONGODB_URI`: `mongodb+srv://user:pass@cluster.mongodb.net/medisphere_db?retryWrites=true&w=majority`
   * `SECRET_KEY`: `<Generate long secure string>`
   * `REDIS_URL`: `rediss://default:password@upstash-redis-url.upstash.io:6379`
   * `QDRANT_URL`: `https://qdrant-cluster-url.qdrant.tech:6333`
   * `QDRANT_API_KEY`: `<Qdrant API Key>`
   * `ALLOWED_ORIGINS`: `https://medisphere-ai.vercel.app`

### 2.2 Frontend Deployment on Vercel (`frontend/vercel.json`)
1. Import GitHub repository into Vercel Dashboard.
2. Set Root Directory to `frontend`.
3. Configure Environment Variables in Vercel:
   * `NEXT_PUBLIC_API_URL`: `https://medisphere-backend.onrender.com`
4. Trigger Production Deployment.

---

## 3. Deployment Readiness Checklist

- [x] Dockerfile & Docker Compose validated for cross-platform compatibility.
- [x] All database connection strings injected via secure environment variables.
- [x] Zero hardcoded secrets in source code or version control history.
- [x] Render health check configured at `/health`.
- [x] Vercel security headers (CSP, HSTS, DENY iframe embedding) enabled in `vercel.json`.
