from .schemas import User, UserModel, UserCreateModel 
from .utils import generate_passwd_hash
from pymongo.asynchronous.collection import AsyncCollection
from datetime import datetime
import uuid 


class UserService:
    async def get_user_by_email(self, email: str, session: AsyncCollection) -> User | None:
        user = await session.find_one({"email": email})
        return None if user is None else User(**user)

    async def user_exists(self, email: str, session: AsyncCollection):
        user = await self.get_user_by_email(email, session)
        return user is not None

    async def create_user(self, user_data: UserCreateModel, session: AsyncCollection) -> UserModel:
        user_data_dict = user_data.model_dump()
        password = user_data_dict.pop("password")
        user_data_dict["password_hash"] = generate_passwd_hash(password)
        new_user = User(**user_data_dict)
        result =await session.insert_one(new_user.model_dump(by_alias=True, exclude={"_id"}, exclude_none=True))
        return UserModel(
            id=str(result.inserted_id),
            username=new_user.username,
            role=new_user.role,
            email=new_user.email,
            is_verified=new_user.is_verified,
            created_at=new_user.created_at,
            update_at=new_user.update_at,
        )

    async def update_user(self, user: User, user_data: dict, session: AsyncCollection) -> UserModel:
        user_data["update_at"] = datetime.now()
        await session.update_one({"_id": user.id},{"$set": user_data})
        updated_user = await session.find_one({"_id" : user.id})
        return UserModel(
            id=str(updated_user["_id"]),
            username=updated_user["username"],
            role=updated_user["role"],
            email=updated_user["email"],
            is_verified=updated_user["is_verified"],
            created_at=updated_user["created_at"],
            update_at=updated_user["update_at"],
        )