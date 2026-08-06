"""
MediSphere AI — Patients API
"""
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from app.services.hospital import PatientService
from pydantic import BaseModel
from datetime import date

router = APIRouter()

# Dependency Injection
def get_patient_service() -> PatientService:
    return PatientService()


class PatientCreate(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    contact_number: str
    address: str
    blood_group: str


@router.get("/", response_model=List[Dict[str, Any]])
async def get_patients(
    skip: int = 0, 
    limit: int = 100,
    service: PatientService = Depends(get_patient_service)
):
    """Get all patients with pagination"""
    patients = await service.repository.get_multi(skip=skip, limit=limit)
    return [p.model_dump(by_alias=True) for p in patients]


@router.post("/", status_code=status.HTTP_201_CREATED)
async def register_patient(
    patient: PatientCreate,
    service: PatientService = Depends(get_patient_service)
):
    """Register a new patient"""
    new_patient = await service.register_patient(patient.model_dump())
    return new_patient.model_dump(by_alias=True)


@router.get("/search")
async def search_patients(
    query: str,
    service: PatientService = Depends(get_patient_service)
):
    """Search patients by name"""
    results = await service.search_patients(query)
    return [p.model_dump(by_alias=True) for p in results]


@router.get("/{patient_id}")
async def get_patient(
    patient_id: str,
    service: PatientService = Depends(get_patient_service)
):
    """Get a specific patient by ID"""
    patient = await service.get_or_404(patient_id)
    return patient.model_dump(by_alias=True)
