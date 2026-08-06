"""
MediSphere AI — Emergency API
"""
from typing import Dict, Any
from fastapi import APIRouter, Depends, status
from pydantic import BaseModel
from app.services.emergency import EmergencyService

router = APIRouter()

def get_emergency_service() -> EmergencyService:
    return EmergencyService()


class VitalsUpdate(BaseModel):
    heart_rate: int
    blood_pressure: str
    temperature: float
    oxygen_level: int


@router.get("/")
async def get_active_emergencies(service: EmergencyService = Depends(get_emergency_service)):
    """Get the active emergency triage queue"""
    cases = await service.get_triage_queue()
    return [c.model_dump(by_alias=True) for c in cases]


@router.post("/{case_id}/vitals")
async def update_vitals(
    case_id: str,
    vitals: VitalsUpdate,
    service: EmergencyService = Depends(get_emergency_service)
):
    """Update vitals for an emergency case"""
    case = await service.update_vitals(case_id, vitals.model_dump())
    return case.model_dump(by_alias=True)
