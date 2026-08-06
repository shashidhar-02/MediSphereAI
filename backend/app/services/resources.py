"""
MediSphere AI — Resources Services (Pharmacy & Equipment)
"""
from typing import List
from fastapi import HTTPException, status
from app.services.base import BaseService
from app.repositories.base import BaseRepository
from app.models.resources import Medicine, Equipment


class MedicineRepository(BaseRepository[Medicine]):
    def __init__(self):
        super().__init__(Medicine)


class EquipmentRepository(BaseRepository[Equipment]):
    def __init__(self):
        super().__init__(Equipment)


class PharmacyService(BaseService[Medicine]):
    def __init__(self):
        super().__init__(MedicineRepository())

    async def get_inventory_alerts(self) -> List[Medicine]:
        """In a real system, this would join with MedicineInventory."""
        # For now, just return a paginated list as a placeholder
        return await self.repository.get_multi(limit=5)


class EquipmentService(BaseService[Equipment]):
    def __init__(self):
        super().__init__(EquipmentRepository())

    async def get_maintenance_due(self) -> List[Equipment]:
        """Get equipment due for maintenance."""
        return await self.repository.get_multi(query={"operational_status": "MAINTENANCE"})
