"""
MediSphere AI — Pharmacy API
"""
from fastapi import APIRouter, Depends
from app.services.resources import PharmacyService

router = APIRouter()

def get_pharmacy_service() -> PharmacyService:
    return PharmacyService()

@router.get("/inventory")
async def get_inventory(service: PharmacyService = Depends(get_pharmacy_service)):
    """Get all medicine inventory"""
    medicines = await service.repository.get_multi()
    return [m.model_dump(by_alias=True) for m in medicines]

@router.get("/alerts")
async def get_stock_alerts(service: PharmacyService = Depends(get_pharmacy_service)):
    """Get low stock alerts"""
    alerts = await service.get_inventory_alerts()
    return [a.model_dump(by_alias=True) for a in alerts]
