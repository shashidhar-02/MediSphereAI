"""
MediSphere AI — Billing API
"""
from fastapi import APIRouter, Depends
from app.services.finance import BillingService

router = APIRouter()

def get_billing_service() -> BillingService:
    return BillingService()

@router.get("/stats")
async def get_billing_stats(service: BillingService = Depends(get_billing_service)):
    """Get overall billing and revenue statistics"""
    return await service.get_revenue_summary()

@router.get("/pending")
async def get_pending_bills(service: BillingService = Depends(get_billing_service)):
    """Get all pending or partially paid bills"""
    bills = await service.get_pending_bills()
    return [b.model_dump(by_alias=True) for b in bills]
