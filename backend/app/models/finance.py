"""
MediSphere AI — Finance Models (Billing & Insurance)
"""
from typing import List, Optional
from datetime import datetime
from beanie import Indexed
from pydantic import BaseModel, Field
from app.models.base import BaseDocument


class InvoiceItem(BaseModel):
    description: str
    quantity: int
    unit_price: float
    total: float


class Bill(BaseDocument):
    invoice_number: Indexed(str, unique=True)
    patient_id: Indexed(str)
    admission_id: Optional[str] = None  # Link to an admission if applicable
    items: List[InvoiceItem] = []
    subtotal: float
    tax: float
    discount: float = 0.0
    total_amount: float
    amount_paid: float = 0.0
    payment_status: Indexed(str) = "PENDING"  # PENDING, PARTIAL, PAID, CANCELLED
    due_date: datetime
    
    class Settings:
        name = "bills"
        indexes = [
            [("patient_id", 1), ("payment_status", 1)]
        ]


class InsuranceClaim(BaseDocument):
    claim_number: Indexed(str, unique=True)
    bill_id: Indexed(str)
    patient_id: str
    provider_name: str
    policy_number: str
    claim_amount: float
    approved_amount: Optional[float] = None
    claim_status: Indexed(str) = "SUBMITTED"  # SUBMITTED, IN_REVIEW, APPROVED, REJECTED
    rejection_reason: Optional[str] = None
    submission_date: datetime
    resolution_date: Optional[datetime] = None
    
    class Settings:
        name = "insurance_claims"
