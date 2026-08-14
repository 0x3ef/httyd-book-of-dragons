from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    MONGODB_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str
    REDIS_HOST: str
    REDIS_PORT: str
    REDIS_URL: str
    CELERY_BROKER_URL: str
    CELERY_RESULT_BACKEND: str
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_SERVER: str
    MAIL_PORT: int
    MAIL_FROM: str
    MAIL_FROM_NAME: str
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False
    USE_CREDENTIALS: bool = True
    VALIDATE_CERTS: bool = True
    DOMAIN: str
    DOMAIN_FRONTEND: str
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

Config = Settings()
