"""
MediSphere AI — Operations Models (Appointments, Beds, Emergency)
"""
from typing import Optional, Dict, Any
from datetime import datetime
from beanie import Indexed
from app.models.base import BaseDocument


class Appointment(BaseDocument):
    patient_id: Indexed(str)
    doctor_id: Indexed(str)
    department_id: str
    appointment_date: Indexed(datetime)
    reason: str
    type: str = "GENERAL"  # GENERAL, FOLLOW_UP, SURGERY
    notes: Optional[str] = None
    
    class Settings:
        name = "appointments"
        indexes = [
            [("doctor_id", 1), ("appointment_date", 1)]
        ]


class Bed(BaseDocument):
    bed_number: Indexed(str, unique=True)
    ward: str
    department_id: str
    type: str = "GENERAL"  # GENERAL, ICU, OXYGEN, VENTILATOR
    is_occupied: bool = False
    current_patient_id: Optional[str] = None
    last_maintenance_date: Optional[datetime] = None
    
    class Settings:
        name = "beds"
        indexes = [
            [("ward", 1), ("is_occupied", 1)]
        ]


class EmergencyCase(BaseDocument):
    patient_id: Optional[str] = None  # Might be unknown initially
    triage_level: int = 1  # 1 (Resuscitation) to 5 (Non-urgent)
    arrival_time: Indexed(datetime)
    symptoms: str
    vitals: Dict[str, Any] = {}
    assigned_doctor_id: Optional[str] = None
    outcome: Optional[str] = None  # ADMITTED, DISCHARGED, DECEASED, TRANSFERRED
    
    class Settings:
        name = "emergency_cases"
        indexes = [
            [("triage_level", 1), ("status", 1)]
        ]
