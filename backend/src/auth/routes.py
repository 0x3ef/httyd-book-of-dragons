from fastapi import APIRouter, Depends, status 
from .schemas import UserModel, User, UserCreateModel, UserLoginModel, EmailModel, PasswordResetRequestModel, PasswordResetConfirmModel 
from .service import UserService
from src.db.mongo import get_session 
from pymongo.asynchronous.collection import AsyncCollection 
from fastapi.exceptions import HTTPException
from .utils import create_access_token, verify_password, generate_passwd_hash, create_url_safe_token, decode_url_safe_token 
from .dependencies import RefreshTokenBearer, AccessTokenBearer, get_current_user, RoleChecker
from fastapi.responses import JSONResponse 
from datetime import timedelta, datetime 
from src.db.redis import add_jti_to_blocklist
from src.errors import UserAlreadyExists, UserNotFound, InvalidCredentials, InvalidToken 
from src.mail import mail, create_message, render_template
from src.config import Config 
from src.celery_tasks import send_email


auth_router = APIRouter()
user_service = UserService()
role_checker = RoleChecker(["admin", "user"])

REFRESH_TOKEN_EXPIRY = 2 


@auth_router.post('/send-mail')
async def send_mail(emails: EmailModel):
    emails = emails.addresses
    html_message = "<h1>slava</h1>"
    subject = "slava"

    send_email.delay(emails, subject, html_message)
    
    return {"message": "Email send successfully"}

@auth_router.post('/signup', status_code=status.HTTP_201_CREATED)
async def create_user_account(user_data: UserCreateModel, session: AsyncCollection = Depends(get_session)):
    email = user_data.email 
    user_exists = await user_service.user_exists(email, session)
    if user_exists:
        raise UserAlreadyExists()

    new_user = await user_service.create_user(user_data, session)
    
    token = create_url_safe_token({"email": email})
    html_message = render_template("emails/account_pending.html", username = new_user.username)

    emails = [email]
    subject="Your Dragon db account is pending"
    send_email.delay(emails, subject, html_message)

    emails = [Config.MAIL_USERNAME]
    link = f"http://{Config.DOMAIN}/api/v1/auth/verify/{token}"
    html_message = render_template("emails/admin_new_account.html", username = new_user.username, email = new_user.email, link = link)
    send_email.delay(emails, subject, html_message)
    return {"message": "Account created! Please wait for your account to be activated.", "user": new_user}

@auth_router.get('verify/{token}')
async def verify_user_account(token: str, session: AsyncCollection = Depends(get_session)):
    token_data = decode_url_safe_token(token)
    if not token_data:
        raise InvalidToken()

    user_email = token_data.get('email')

    if user_email:
        user = await user_service.get_user_by_email(user_email, session)
        if user is None:
            raise UserNotFound()
        
        user_upt = await user_service.update_user(user,{"is_verified": True}, session)
        if user_upt.is_verified:
            html_message = render_template("emails/account_approved.html", username = user_upt.username) 
            subject="Account verified"
            send_email.delay([user_upt.email], subject, html_message)
    
        return JSONResponse(content={"message": "Account activated successfully"}, status_code=status.HTTP_200_OK)
    return JSONResponse(content={"message": "Error occured during verification"}, status_code=HTTP_500_INTERNAL_SERVER_ERROR)

@auth_router.post('/login')
async def login_users(login_data: UserLoginModel, session: AsyncCollection = Depends(get_session)):
    email = login_data.email 
    password = login_data.password 
    user = await user_service.get_user_by_email(email, session)
    
    if user is not None:
        password_valid = verify_password(password, user.password_hash)

        if password_valid and user.is_verified:
            access_token = create_access_token(
                user_data={
                    'email': user.email,
                    'user_uid': str(user.id),
                    'role': user.role
                }

            )
            
            refresh_token = create_access_token(
                user_data={
                    'email': user.email,
                    'user_uid': str(user.id),
                }, 
                refresh=True,
                expiry=timedelta(days=REFRESH_TOKEN_EXPIRY)
            )

            return JSONResponse(
                content={
                    "message": "Login succesful",
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "user": {
                        "email" : user.email,
                        "uid": str(user.id)
                    } 
                }
            )
    raise InvalidCredentials()

@auth_router.get('/refresh-token')
async def get_new_access_token(token_details: dict = Depends(RefreshTokenBearer())):
    expiry_timestamp = token_details['exp']
    if datetime.fromtimestamp(expiry_timestamp) > datetime.now():
        new_access_token = create_access_token(user_data = token_details['user'])
        return JSONResponse(content={"access_token" : new_access_token})
    raise InvalidToken()

@auth_router.get('/me', response_model=UserModel)
async def get_current_user(user = Depends(get_current_user), _: bool = Depends(role_checker)):
    return user

@auth_router.get('/logout')
async def revoke_token(token_details: dict = Depends(AccessTokenBearer())):
    jti = token_details['jti']
    await add_jti_to_blocklist(jti)
    return JSONResponse(content={"message" : "Logged out successfully"}, status_code=status.HTTP_200_OK)

@auth_router.post('/password-reset-request')
async def password_reset_request(email_data: PasswordResetRequestModel):
    email = email_data.email
    token = create_url_safe_token({"email":email})
    
    link = f"http://{Config.DOMAIN_FRONTEND}/password-reset-confirm/{token}"
    html_message = render_template("emails/password_reset.html", link = link) 
    subject="Reset Your Password"
    send_email.delay([email], subject, html_message)
    
    return JSONResponse(content={
        "message":"Please check your email for intructions to reset your password"},
        status_code=status.HTTP_200_OK)

@auth_router.post('/password-reset-confirm/{token}')
async def reset_account_password(token: str,  passwords: PasswordResetConfirmModel, session: AsyncCollection = Depends(get_session)):
    new_password = passwords.new_password
    confirm_password = passwords.confirm_new_password
    if new_password != confirm_password:
        raise HTTPException(detail="Passwords do not match", status_code=status.HTTP_400_BAD_REQUEST)

    token_data = decode_url_safe_token(token)
    user_email = token_data.get('email')

    if user_email:
        user = await user_service.get_user_by_email(user_email,session)

        if not user:
            raise UserNotFound()
        
        password_hash = generate_passwd_hash(new_password)
        
        await user_service.update_user(user,{'password_hash': password_hash}, session)

        return JSONResponse(content={"message":"Password reset successfully"}, status_code=status.HTTP_200_OK)

    return JSONResponse(content={"message":"Error occured during password reset"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR) 