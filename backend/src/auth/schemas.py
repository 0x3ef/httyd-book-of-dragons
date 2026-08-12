from pydantic import BaseModel, Field, EmailStr, ConfigDict 
from bson import ObjectId
from datetime import datetime
from typing import List
import uuid 


class User(BaseModel):
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        populate_by_name=True
    )
    id: ObjectId | None = Field(default=None, alias="_id")
    username: str
    role: str = "user"
    email: EmailStr
    password_hash: str
    is_verified: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.now)
    update_at: datetime = Field(default_factory=datetime.now)


class UserModel(BaseModel):
    id: str
    username: str
    role: str
    email: EmailStr
    is_verified: bool
    created_at: datetime
    update_at: datetime


class UserCreateModel(BaseModel):
    username: str = Field(max_length=25)
    email: EmailStr = Field(max_length=30)
    password: str = Field(min_length=8, max_length=72)


class UserLoginModel(BaseModel):
    email: EmailStr = Field(max_length=30)
    password: str = Field(min_length=8)


class EmailModel(BaseModel):
    addresses: List[str]


class PasswordResetRequestModel(BaseModel):
    email: EmailStr


class PasswordResetConfirmModel(BaseModel):
    new_password: str
    confirm_new_password: str