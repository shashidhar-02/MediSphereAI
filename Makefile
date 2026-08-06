.PHONY: help up down restart logs build test lint dev

help:
	@echo "MediSphere AI Management Commands:"
	@echo "  make up       - Start all Docker containers in background"
	@echo "  make down     - Stop all Docker containers"
	@echo "  make restart  - Restart all Docker containers"
	@echo "  make logs     - Follow container logs"
	@echo "  make build    - Rebuild Docker images"
	@echo "  make test     - Run backend test suite"
	@echo "  make lint     - Run linter checks"

up:
	docker compose up -d --build

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

build:
	docker compose build --no-cache

test:
	python -m pytest backend/tests -v

lint:
	python -m flake8 backend/app
