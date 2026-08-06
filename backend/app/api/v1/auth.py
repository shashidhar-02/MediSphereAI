"""
MediSphere AI — Auth API
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.user import User
from app.repositories.core import UserRepository
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/login")
async def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    repo = UserRepository()
    user = await repo.get_by_username(form_data.username)
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    # The primary role for the JWT
    primary_role = user.roles[0] if user.roles else "user"
    
    return {
        "access_token": create_access_token(user.id, primary_role),
        "token_type": "bearer",
        "user_id": str(user.id),
        "roles": user.roles
    }

@router.get("/me")
async def get_my_profile(current_user: User = Depends(get_current_user)):
    """
    Get current logged in user profile.
    """
    return current_user.model_dump(by_alias=True, exclude={"hashed_password"})
