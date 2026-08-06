"""
MediSphere AI — Core Hospital Models
"""
from typing import List, Optional, Any
from datetime import datetime, date
from beanie import Indexed
from pydantic import Field
from app.models.base import BaseDocument


class Department(BaseDocument):
    name: Indexed(str, unique=True)
    code: Indexed(str, unique=True)
    head_doctor_id: Optional[str] = None
    capacity: int = 0
    current_occupancy: int = 0
    
    class Settings:
        name = "departments"


class Doctor(BaseDocument):
    user_id: Indexed(str, unique=True)  # Links to User
    specialization: str
    department_id: str
    license_number: str
    consultation_fee: float
    availability_status: str = "AVAILABLE"  # AVAILABLE, ON_LEAVE, IN_SURGERY
    
    class Settings:
        name = "doctors"


class Patient(BaseDocument):
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    contact_number: str
    email: Optional[str] = None
    address: str
    blood_group: str
    medical_history: List[str] = []
    allergies: List[str] = []
    emergency_contact: dict = {}
    
    class Settings:
        name = "patients"
        indexes = [
            [("first_name", 1), ("last_name", 1)],
            "contact_number"
        ]
