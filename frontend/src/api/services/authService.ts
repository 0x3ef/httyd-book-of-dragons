import api from '../client';
import type { User, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, MessageResponse, RefreshTokenResponse, PasswordResetRequest, PasswordResetConfirm } from '../../types/user';

export async function createUserAccount(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/signup', data);
    return response.data;
}

export async function loginUsers(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
}

export async function revokeToken(): Promise<MessageResponse> {
    const response = await api.get<MessageResponse>('/auth/logout');
    return response.data;
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
    const response = await api.get<RefreshTokenResponse>('/auth/refresh-token');
    return response.data;
}

export async function getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/auth/me");
    return response.data;
}

export async function passwordResetRequest(data: PasswordResetRequest): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>('/auth/password-reset-request', data);
    return response.data; 
}

export async function passwordResetConfirm(token: string, data: PasswordResetConfirm): Promise<MessageResponse> {
    const response = await api.post<MessageResponse>(`/auth/password-reset-confirm/${token}`, data);
    return response.data; 
}