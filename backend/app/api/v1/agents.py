"""Agents API"""
from fastapi import APIRouter
from app.mock.data_generator import get_agents_status, rand_int, rand_float

router = APIRouter()

@router.get("/status")
async def get_all_agents_status():
    agents = get_agents_status()
    return {
        "total": len(agents),
        "running": len([a for a in agents if a["status"] == "running"]),
        "idle": len([a for a in agents if a["status"] == "idle"]),
        "error": len([a for a in agents if a["status"] == "error"]),
        "agents": agents,
    }

@router.get("/{agent_key}/status")
async def get_agent_status(agent_key: str):
    agents = get_agents_status()
    for agent in agents:
        if agent["key"] == agent_key:
            return agent
    return {"error": "Agent not found"}

@router.post("/{agent_key}/trigger")
async def trigger_agent(agent_key: str):
    from datetime import datetime
    return {
        "message": f"Agent '{agent_key}' triggered successfully",
        "agent_key": agent_key,
        "started_at": datetime.now().isoformat(),
        "estimated_completion_seconds": rand_int(5, 30),
    }

@router.get("/")
async def list_agents():
    from app.mock.data_generator import AGENT_DEFINITIONS
    return {"agents": AGENT_DEFINITIONS}

@router.get("/notifications")
async def list_notifications(limit: int = 20):
    from app.mock.data_generator import fake, rand_choice, _hours_ago
    notifs = []
    types = ["alert", "info", "warning", "critical"]
    type_weights = [30, 30, 25, 15]
    import random
    rng = random.Random()
    for i in range(limit):
        ntype = rng.choices(types, weights=type_weights, k=1)[0]
        notifs.append({
            "id": str(i+1),
            "type": ntype,
            "title": rand_choice([
                "ICU Bed Capacity Alert",
                "Medicine Stock Alert",
                "Emergency Queue Update",
                "Staff Shortage Detected",
                "Equipment Maintenance Due",
                "Insurance Claim Action Required",
                "Critical Lab Result",
                "High Patient Wait Time",
            ]),
            "message": fake.sentence(),
            "source_agent": rand_choice(["Emergency Response Agent", "Pharmacy Intelligence Agent", "Bed Intelligence Agent"]),
            "is_read": rng.random() > 0.4,
            "created_at": _hours_ago(rng.uniform(0, 24)).isoformat(),
        })
    return {"total": len(notifs), "notifications": notifs}
