from pymongo.asynchronous.collection import AsyncCollection
from pymongo import AsyncMongoClient 
from src.config import Config

client = AsyncMongoClient(Config.MONGODB_URL, uuidRepresentation="standard")
db = client["DDB"]
users_collection = db["users"]

async def check_mongodb_connection():
    try:
        await client.admin.command("ping")
        print("MongoDB connected successfully")
        return True
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return False

def get_session() -> AsyncCollection:
    return users_collection
