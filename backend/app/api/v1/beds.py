"""
MediSphere AI — Beds API
"""
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, status
from app.services.hospital import BedService

router = APIRouter()

def get_bed_service() -> BedService:
    return BedService()


@router.get("/summary")
async def get_bed_summary(service: BedService = Depends(get_bed_service)):
    """Get overall bed occupancy metrics"""
    return await service.get_dashboard_summary()


@router.get("/")
async def get_all_beds(
    ward: str = None,
    service: BedService = Depends(get_bed_service)
):
    """Get all beds, optionally filtered by ward"""
    query = {"ward": ward} if ward else {}
    beds = await service.repository.get_multi(query=query)
    return [b.model_dump(by_alias=True) for b in beds]


@router.post("/{bed_id}/assign")
async def assign_bed(
    bed_id: str,
    patient_id: str,
    service: BedService = Depends(get_bed_service)
):
    """Assign a patient to a bed"""
    bed = await service.assign_bed(bed_id, patient_id)
    return bed.model_dump(by_alias=True)


@router.post("/{bed_id}/discharge")
async def discharge_bed(
    bed_id: str,
    service: BedService = Depends(get_bed_service)
):
    """Discharge patient from a bed"""
    bed = await service.discharge_bed(bed_id)
    return bed.model_dump(by_alias=True)
