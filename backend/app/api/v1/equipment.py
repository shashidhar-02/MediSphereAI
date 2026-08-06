"""
MediSphere AI — Equipment API
"""
from fastapi import APIRouter, Depends
from app.services.resources import EquipmentService

router = APIRouter()

def get_equipment_service() -> EquipmentService:
    return EquipmentService()

@router.get("/")
async def get_all_equipment(service: EquipmentService = Depends(get_equipment_service)):
    """Get all hospital equipment"""
    eq = await service.repository.get_multi()
    return [e.model_dump(by_alias=True) for e in eq]

@router.get("/maintenance")
async def get_maintenance_due(service: EquipmentService = Depends(get_equipment_service)):
    """Get equipment needing maintenance"""
    eq = await service.get_maintenance_due()
    return [e.model_dump(by_alias=True) for e in eq]
