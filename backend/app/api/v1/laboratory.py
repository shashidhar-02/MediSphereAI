"""Laboratory API"""
from fastapi import APIRouter, Query
from typing import Optional
from app.mock.data_generator import generate_lab_orders, LAB_TESTS, rand_int, rand_float

router = APIRouter()

@router.get("/orders")
async def list_orders(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    limit: int = Query(60, le=200),
):
    orders = generate_lab_orders(80)
    if status:
        orders = [o for o in orders if o["status"] == status]
    if priority:
        orders = [o for o in orders if o["priority"] == priority]
    return {"total": len(orders), "orders": orders[:limit]}

@router.get("/stats")
async def get_stats():
    orders = generate_lab_orders(80)
    return {
        "total_today": rand_int(200, 450),
        "completed": rand_int(120, 280),
        "pending": rand_int(60, 150),
        "critical_pending": rand_int(3, 12),
        "avg_turnaround_hours": rand_float(2.1, 5.8, 1),
        "by_status": {
            "ordered": len([o for o in orders if o["status"] == "ordered"]),
            "sample_collected": len([o for o in orders if o["status"] == "sample_collected"]),
            "in_progress": len([o for o in orders if o["status"] == "in_progress"]),
            "completed": len([o for o in orders if o["status"] == "completed"]),
        },
        "by_category": {
            "Hematology": rand_int(30, 80),
            "Biochemistry": rand_int(50, 120),
            "Microbiology": rand_int(20, 60),
            "Radiology": rand_int(40, 100),
            "Cardiology": rand_int(15, 45),
        },
    }

@router.get("/critical")
async def get_critical_tests():
    orders = generate_lab_orders(80)
    return [o for o in orders if o["is_critical"]]

@router.get("/tests")
async def list_test_catalog():
    return {"tests": LAB_TESTS}
