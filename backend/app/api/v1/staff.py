"""
MediSphere AI — Staff API
"""
from fastapi import APIRouter, Depends
from app.services.staff import StaffService, DepartmentService

router = APIRouter()

def get_staff_service() -> StaffService:
    return StaffService()

def get_dept_service() -> DepartmentService:
    return DepartmentService()

@router.get("/")
async def get_all_staff(service: StaffService = Depends(get_staff_service)):
    """Get all hospital staff / doctors"""
    staff = await service.repository.get_multi()
    return [s.model_dump(by_alias=True) for s in staff]

@router.get("/departments")
async def get_all_departments(service: DepartmentService = Depends(get_dept_service)):
    """Get all departments"""
    depts = await service.get_active_departments()
    return [d.model_dump(by_alias=True) for d in depts]

@router.get("/departments/{dept_id}/staff")
async def get_staff_by_department(dept_id: str, service: StaffService = Depends(get_staff_service)):
    """Get staff for a specific department"""
    staff = await service.get_by_department(dept_id)
    return [s.model_dump(by_alias=True) for s in staff]
