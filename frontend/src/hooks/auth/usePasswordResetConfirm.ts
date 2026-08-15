import { useMutation } from '@tanstack/react-query';
import { passwordResetConfirm } from '../../api/services/authService';
import type { PasswordResetConfirm, MessageResponse } from "../../types/user";

export function usePasswordResetConfirm(token: string) {
    return useMutation<MessageResponse, Error, PasswordResetConfirm>({
        mutationFn: (data) => passwordResetConfirm(token, data),
    });
}