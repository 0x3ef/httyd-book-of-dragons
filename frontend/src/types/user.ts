export interface User {
  id : string;
  username: string;
  role: string;
  email: string;
  is_verified: string;
  created_at: string;
  update_at: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface AuthUser {
    email: string;
    uid: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: AuthUser; 
} 

export interface MessageResponse {
    message: string;
}

export interface RefreshTokenResponse {
    access_token: string;
}

export interface PasswordResetRequest {
    email: string;
}

export interface PasswordResetConfirm {
    new_password: string;
    confirm_new_password: string;
}