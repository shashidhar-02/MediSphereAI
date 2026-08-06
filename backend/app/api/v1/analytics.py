"""Analytics API"""
from fastapi import APIRouter
from app.mock.data_generator import (
    get_hourly_patient_flow, get_daily_revenue, get_department_performance,
    get_predictive_data, get_hospital_kpis, rand_int, rand_float
)

router = APIRouter()

@router.get("/kpis/history")
async def get_kpi_history(metric: str = "bed_occupancy_rate", days: int = 30):
    from app.mock.data_generator import _now, rand_float
    from datetime import timedelta
    data = []
    base = _now()
    for d in range(days, 0, -1):
        day = base - timedelta(days=d)
        data.append({
            "date": day.strftime("%b %d"),
            "value": rand_float(60, 95, 1),
        })
    return {"metric": metric, "data": data}

@router.get("/patient-flow/hourly")
async def get_hourly_flow():
    return get_hourly_patient_flow(24)

@router.get("/revenue/daily")
async def get_daily_revenue_data():
    return get_daily_revenue(30)

@router.get("/departments")
async def get_dept_performance():
    return get_department_performance()

@router.get("/predictions")
async def get_predictions():
    return get_predictive_data()

@router.get("/summary")
async def get_analytics_summary():
    return {
        "kpis": get_hospital_kpis(),
        "patient_flow": get_hourly_patient_flow(24),
        "department_performance": get_department_performance(),
        "predictions": get_predictive_data(),
        "revenue": get_daily_revenue(7),
    }

@router.get("/root-cause")
async def get_root_cause_analysis():
    return {
        "analysis": {
            "issue": "Increased average waiting time (+34%)",
            "root_causes": [
                {"level": 1, "cause": "Emergency department overcrowding", "confidence": 0.92},
                {"level": 2, "cause": "ICU beds unavailable (96% occupancy)", "confidence": 0.88},
                {"level": 3, "cause": "Delayed patient discharge (avg +6h)", "confidence": 0.85},
                {"level": 4, "cause": "Night shift nursing shortage", "confidence": 0.79},
                {"level": 5, "cause": "Increased weekend patient arrivals", "confidence": 0.74},
            ],
            "recommended_actions": [
                "Deploy additional night nurses",
                "Expedite discharge for stable patients",
                "Open overflow ward",
            ],
        }
    }
