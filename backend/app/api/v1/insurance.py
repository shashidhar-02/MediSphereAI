"""
MediSphere AI — Insurance API
"""
from fastapi import APIRouter, Depends
from app.services.finance import InsuranceService

router = APIRouter()

def get_insurance_service() -> InsuranceService:
    return InsuranceService()

@router.get("/claims")
async def get_all_claims(service: InsuranceService = Depends(get_insurance_service)):
    """Get all insurance claims"""
    claims = await service.repository.get_multi()
    return [c.model_dump(by_alias=True) for c in claims]

@router.get("/claims/pending")
async def get_pending_claims(service: InsuranceService = Depends(get_insurance_service)):
    """Get pending insurance claims"""
    claims = await service.get_pending_claims()
    return [c.model_dump(by_alias=True) for c in claims]
