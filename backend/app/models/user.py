"""
MediSphere AI — Auth Models
"""
from typing import List, Optional
from pydantic import EmailStr
from beanie import Indexed
from app.models.base import BaseDocument


class Permission(BaseDocument):
    name: Indexed(str, unique=True)
    description: str
    
    class Settings:
        name = "permissions"


class Role(BaseDocument):
    name: Indexed(str, unique=True)
    description: str
    permissions: List[str] = []  # List of permission names
    
    class Settings:
        name = "roles"


class User(BaseDocument):
    username: Indexed(str, unique=True)
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    full_name: str
    roles: List[str] = []  # List of role names
    department_id: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False

    class Settings:
        name = "users"
