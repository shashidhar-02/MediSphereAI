"""
MediSphere AI — Staff & Department Services
"""
from typing import List
from fastapi import HTTPException, status
from app.services.base import BaseService
from app.repositories.core import DoctorRepository
from app.repositories.base import BaseRepository
from app.models.hospital import Doctor, Department


class DepartmentRepository(BaseRepository[Department]):
    def __init__(self):
        super().__init__(Department)


class StaffService(BaseService[Doctor]):
    def __init__(self):
        super().__init__(DoctorRepository())

    async def get_by_department(self, department_id: str) -> List[Doctor]:
        return await self.repository.get_by_department(department_id)


class DepartmentService(BaseService[Department]):
    def __init__(self):
        super().__init__(DepartmentRepository())

    async def get_active_departments(self) -> List[Department]:
        return await self.repository.get_multi(query={"status": "ACTIVE"})
