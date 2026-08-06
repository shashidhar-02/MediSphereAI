"""Appointments & Notifications API stubs"""
from fastapi import APIRouter, Query
from typing import Optional
from app.mock.data_generator import generate_appointments, rand_int, rand_float

# Appointments
router = APIRouter()

@router.get("/")
async def list_appointments(
    status: Optional[str] = None,
    doctor: Optional[str] = None,
    department: Optional[str] = None,
    limit: int = Query(80, le=300),
):
    appts = generate_appointments(100)
    if status:
        appts = [a for a in appts if a["status"] == status]
    if department:
        appts = [a for a in appts if a["department"].lower() == department.lower()]
    return {"total": len(appts), "appointments": appts[:limit]}

@router.get("/stats")
async def get_appointment_stats():
    appts = generate_appointments(100)
    return {
        "total_today": len(appts),
        "completed": len([a for a in appts if a["status"] == "completed"]),
        "cancelled": len([a for a in appts if a["status"] == "cancelled"]),
        "no_show": len([a for a in appts if a["status"] == "no_show"]),
        "high_no_show_risk": len([a for a in appts if a["no_show_risk"] > 0.35]),
        "avg_no_show_risk": round(sum(a["no_show_risk"] for a in appts) / len(appts), 3),
        "upcoming": len([a for a in appts if a["status"] in ["scheduled", "confirmed"]]),
    }
