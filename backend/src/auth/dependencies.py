from fastapi import Request, status, Depends
from fastapi.security import HTTPBearer 
from fastapi.security.http import HTTPAuthorizationCredentials
from .utils import decode_token
from fastapi.exceptions import HTTPException 
from pymongo.asynchronous.collection import AsyncCollection
from src.db.mongo import get_session 
from src.db.redis import token_in_blocklist
from .schemas import UserModel
from .service import UserService 
from typing import Any, List
from src.errors import (
    InvalidToken,
    RefreshTokenRequired,
    AccessTokenRequired,
    InsufficientPermission,
    AccountNotVerified,
    UserNotFound
)


user_service = UserService()


class TokenBearer(HTTPBearer):
    def __init__(self, auto_error=True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials | None:
        creds = await super().__call__(request)
        token = creds.credentials 

        if not self.token_valid(token):
            raise InvalidToken()

        token_data = decode_token(token)

        if await token_in_blocklist(token_data["jti"]):
            raise InvalidToken()
        
        self.verify_token_data(token_data)

        return token_data 

    def token_valid(self, token: str) -> bool:
        token_data = decode_token(token)
        return token_data is not None

    def verify_token_data(self, token_data):
        raise NotImplementedError("Please Override this method in child classes")


class AccessTokenBearer(TokenBearer):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and token_data["refresh"]:
            raise AccessTokenRequired()


class RefreshTokenBearer(TokenBearer):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and not token_data["refresh"]:
            raise RefreshTokenRequired()


async def get_current_user(
        token_details: dict = Depends(AccessTokenBearer()),
        session: AsyncCollection = Depends(get_session)
):
    user_email = token_details["user"]["email"]
    user = await user_service.get_user_by_email(user_email, session)
    if user is None:
        raise UserNotFound()

    return UserModel(
        id=str(user.id),
        username=user.username,
        role=user.role,
        email=user.email,
        is_verified=user.is_verified,
        created_at=user.created_at,
        update_at=user.update_at,
    )


class RoleChecker:
    def __init__(self, allowed_roles: List[str]) -> None:
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: UserModel = Depends(get_current_user)) -> Any:
        if not current_user.is_verified:
            raise AccountNotVerified()
        
        if current_user.role in self.allowed_roles:
            return True

        raise InsufficientPermission()
