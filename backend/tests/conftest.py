"""
MediSphere AI — Pytest Configuration
"""
import pytest
import asyncio
from typing import AsyncGenerator
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from app.main import app
from app.core.config import settings
from app.models.user import User, Role, Permission
from app.models.hospital import Patient, Doctor, Department
from app.models.operations import Bed, EmergencyCase

# Test Database Name
TEST_DB = "medisphere_test_db"

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="session")
async def db_client() -> AsyncGenerator[AsyncIOMotorClient, None]:
    """Provides a MongoDB client for tests and cleans up afterwards."""
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    
    # Initialize Beanie for the test DB
    await init_beanie(
        database=client[TEST_DB],
        document_models=[
            User, Role, Permission,
            Patient, Doctor, Department,
            Bed, EmergencyCase
        ]
    )
    
    yield client
    
    # Teardown: Drop the test database after the test session finishes
    await client.drop_database(TEST_DB)
    client.close()

@pytest.fixture(scope="module")
def client() -> TestClient:
    """Provides a FastAPI test client."""
    with TestClient(app) as c:
        yield c
