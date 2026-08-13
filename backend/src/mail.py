from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType 
from src.config import Config 
from pathlib import Path
from jinja2 import Environment, FileSystemLoader

BASE_DIR = Path(__file__).resolve().parent 

template_env = Environment(loader=FileSystemLoader( BASE_DIR / "templates"))

mail_config = ConnectionConfig(
    MAIL_USERNAME=Config.MAIL_USERNAME,
    MAIL_PASSWORD=Config.MAIL_PASSWORD,
    MAIL_FROM=Config.MAIL_FROM,
    MAIL_PORT=Config.MAIL_PORT,
    MAIL_SERVER=Config.MAIL_SERVER,
    MAIL_FROM_NAME=Config.MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=Path(BASE_DIR, 'templates')
)

mail = FastMail(config=mail_config)


def render_template(template_name: str, **context) -> str:
    template = template_env.get_template(template_name)
    return template.render(**context)


def create_message(recipients: list[str], subject: str, body: str) -> MessageSchema:
    return MessageSchema(
        recipients=recipients, subject=subject, body=body, subtype=MessageType.html,
    )