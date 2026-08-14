from typing import Any, Callable
from fastapi import FastAPI, status
from fastapi.requests import Request
from fastapi.responses import JSONResponse


class DragonException(Exception):
    """This is the base class for all Dragon errors"""
    pass


class ClassNotFound(DragonException):
    """Class Not found"""
    pass


class ClassAlreadyExists(DragonException):
    """Dragon class already exists in the db"""
    pass


class ImageNotFound(DragonException):
    """Image Not found"""
    pass


class AbilityNotFound(DragonException):
    """Ability Not found"""
    pass


class DistributionNotFound(DragonException):
    """Distribution Not found"""
    pass 


class DragonNotFound(DragonException):
    """Dragon Not found"""
    pass 


class DragonAlreadyExists(DragonException):
    """Dragon already exists"""
    pass 


class AccountNotVerified(DragonException):
    """Account not yet verified"""
    pass


class InvalidToken(DragonException):
    """User has provided an invalid or expired token"""
    pass


class RevokedToken(DragonException):
    """User has provided a token that has been revoked"""
    pass


class AccessTokenRequired(DragonException):
    """User has provided a refresh token when an access token is needed"""
    pass


class RefreshTokenRequired(DragonException):
    """User has provided an access token when a refresh token is needed"""
    pass


class UserAlreadyExists(DragonException):
    """User has provided an email for a user who exists during sign up."""
    pass


class InvalidCredentials(DragonException):
    """User has provided wrong email or password during log in."""
    pass


class InsufficientPermission(DragonException):
    """User does not have the neccessary permissions to perform an action."""
    pass


class UserNotFound(DragonException):
    """User Not found"""
    pass


def create_exception_handler(
    status_code: int, initial_detail: Any
) -> Callable[[Request, Exception], JSONResponse]:
    async def exception_handler(request: Request, exc: Exception) -> JSONResponse:
        return JSONResponse(content=initial_detail, status_code=status_code)

    return exception_handler


def register_all_errors(app: FastAPI) -> None:
    app.add_exception_handler(
        ClassNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "Dragon class not found",
                "error_code": "class_not_found",
            },
        ),
    )

    app.add_exception_handler(
        ClassAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_409_CONFLICT,
            initial_detail={
                "message": "A dragon class with this name already exists",
                "error_code": "class_already_exists"
                }
        ),
    )

    app.add_exception_handler(
        ImageNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "Image not found",
                "error_code": "image_not_found",
            },
        ),
    )

    app.add_exception_handler(
        AbilityNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "Ability not found",
                "error_code": "ability_not_found",
            },
        ),
    )

    app.add_exception_handler(
        DistributionNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "Distribution not found",
                "error_code": "distribution_not_found"
            },
        ),
    )

    app.add_exception_handler(
        DragonNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "Dragon not found",
                "error_code": "dragon_not_found"
            },
        ),
    )

    app.add_exception_handler(
        DragonAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_409_CONFLICT,
            initial_detail={
                "message": "A dragon with this name already exists",
                "error_code": "dragon_already_exists"
                }
        ),
    )
    
    app.add_exception_handler(
        AccountNotVerified,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={
                "message": "Account Not verified",
                "error_code": "account_not_verified",
                "resolution":"Please check your email for verification details"
            },
        ),
    )

    app.add_exception_handler(
        UserAlreadyExists,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={
                "message": "User with email already exists",
                "error_code": "user_exists",
            },
        ),
    )

    app.add_exception_handler(
        UserNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "User not found",
                "error_code": "user_not_found",
            },
        ),
    )
    
    app.add_exception_handler(
        InvalidCredentials,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            initial_detail={
                "message": "Invalid Email Or Password",
                "error_code": "invalid_email_or_password",
            },
        ),
    )
    
    app.add_exception_handler(
        InvalidToken,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={
                "message": "Token is invalid Or expired",
                "resolution": "Please get new token",
                "error_code": "invalid_token",
            },
        ),
    )
    
    app.add_exception_handler(
        RevokedToken,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={
                "message": "Token is invalid or has been revoked",
                "resolution": "Please get new token",
                "error_code": "token_revoked",
            },
        ),
    )
    
    app.add_exception_handler(
        AccessTokenRequired,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={
                "message": "Please provide a valid access token",
                "resolution": "Please get an access token",
                "error_code": "access_token_required",
            },
        ),
    )
    
    app.add_exception_handler(
        RefreshTokenRequired,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            initial_detail={
                "message": "Please provide a valid refresh token",
                "resolution": "Please get an refresh token",
                "error_code": "refresh_token_required",
            },
        ),
    )
    
    app.add_exception_handler(
        UserNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            initial_detail={
                "message": "User not found",
                "error_code": "user_not_found",
            },
        ),
    )

    app.add_exception_handler(
        InsufficientPermission,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            initial_detail={
                "message": "You do not have enough permissions to perform this action",
                "error_code": "insufficient_permissions",
            },
        ),
    )