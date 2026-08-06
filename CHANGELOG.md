# Changelog — MediSphere AI

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-06

### Added
- **Complete Enterprise SDLC Ecosystem**: Added 16 structured SDLC phase documentations in `docs/`.
- **OpenAPI & Postman Specifications**: Published OpenAPI 3.1.0 JSON and Postman Collection v2.1.
- **Telemetry & Metrics**: Integrated OpenTelemetry and `/metrics` Prometheus telemetry middleware in FastAPI.
- **DevSecOps Pipeline**: Configured GitHub Actions CI/CD workflows for container scanning, SBOM generation, and secret scanning.
- **Observability Stack**: Added Prometheus configuration and Grafana dashboard specifications.
- **Architecture Decision Records**: Created ADR-001 through ADR-005.
- **Automated Testing Suite**: Implemented pytest test suite validating health checks, metrics, and error routing.
