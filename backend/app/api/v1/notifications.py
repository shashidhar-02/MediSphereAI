"""Notifications API"""
from fastapi import APIRouter
from app.mock.data_generator import fake, rand_choice, _hours_ago
import random

router = APIRouter()
rng = random.Random(42)

@router.get("/")
async def list_notifications(limit: int = 30, unread_only: bool = False):
    types = ["alert", "info", "warning", "critical"]
    type_weights = [30, 30, 25, 15]
    notifs = []
    for i in range(limit):
        ntype = rng.choices(types, weights=type_weights, k=1)[0]
        is_read = rng.random() > 0.4
        if unread_only and is_read:
            continue
        notifs.append({
            "id": str(i+1),
            "type": ntype,
            "title": rand_choice([
                "ICU Bed Capacity Alert",
                "Critical Medicine Stock",
                "Emergency Queue Overflow",
                "Staff Shortage — Night Shift",
                "Equipment Failure Risk",
                "Insurance Claim Expiring",
                "Critical Lab Result Pending",
            ]),
            "message": fake.sentence(),
            "source_agent": rand_choice([
                "Emergency Response Agent", "Pharmacy Intelligence Agent",
                "Bed Intelligence Agent", "Staff Allocation Agent"
            ]),
            "is_read": is_read,
            "created_at": _hours_ago(rng.uniform(0, 24)).isoformat(),
        })
    return {"total": len(notifs), "unread": len([n for n in notifs if not n["is_read"]]), "notifications": notifs}

@router.post("/{notification_id}/read")
async def mark_as_read(notification_id: str):
    return {"message": "Marked as read", "id": notification_id}

@router.post("/mark-all-read")
async def mark_all_read():
    return {"message": "All notifications marked as read"}
