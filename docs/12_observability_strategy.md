# Phase 12 — Observability & Telemetry Strategy: MediSphere AI

## 1. Observability Pillars

MediSphere AI implements three observability pillars:

1. **Structured Logging**: JSON format logs produced by `loguru` detailing request IDs, user roles, latencies, and stack traces.
2. **Prometheus Metrics**: Scraped from `/metrics` endpoint tracking latency histograms, active agent execution cycles, and 4xx/5xx error counters.
3. **OpenTelemetry Tracing**: Distributed tracing across FastAPI API endpoints, MongoDB queries, and Qdrant vector searches.

---

## 2. Prometheus Scraping Configuration (`devops/prometheus/prometheus.yml`)

Prometheus automatically scrapes backend metrics every 15 seconds:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: "medisphere-backend"
    metrics_path: "/metrics"
    static_configs:
      - targets: ["backend:8000"]
```

---

## 3. Grafana Dashboard & Alert Rules

### Key Performance Indicators (KPIs) Visualized:
* **HTTP Request Latency**: p50, p95, and p99 response times.
* **Error Rate %**: Ratio of 5xx HTTP responses to total requests (Alert threshold > 1%).
* **Active Bed Occupancy %**: Real-time hospital occupancy rate gauge.
* **AI Agent Execution Loop Status**: Tracks whether background evaluation loops are active.

---

## 4. Alert Routing Strategy
* **P1 Critical (Page On-Call)**: API availability drop < 99%, MongoDB connectivity failure, ED capacity > 98%.
* **P2 High (Slack / Email Alert)**: Response latency p95 > 500ms, agent execution loop stalled.
* **P3 Warning**: Bed cleaning backlog > 15 beds.
