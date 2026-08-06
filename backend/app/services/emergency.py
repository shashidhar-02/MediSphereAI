"""
MediSphere AI — Emergency Service
"""
from typing import List
from datetime import datetime, timezone
from app.services.base import BaseService
from app.repositories.core import EmergencyCaseRepository
from app.models.operations import EmergencyCase


class EmergencyService(BaseService[EmergencyCase]):
    def __init__(self):
        super().__init__(EmergencyCaseRepository())

    async def admit_case(self, data: dict) -> EmergencyCase:
        data["arrival_time"] = datetime.now(timezone.utc)
        return await self.repository.create(data)

    async def get_triage_queue(self) -> List[EmergencyCase]:
        return await self.repository.get_active_cases()

    async def update_vitals(self, case_id: str, vitals: dict) -> EmergencyCase:
        case = await self.get_or_404(case_id)
        case.vitals.update(vitals)
        return await self.repository.update(case, case.model_dump())
