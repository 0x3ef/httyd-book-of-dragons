import { useMutation } from '@tanstack/react-query';
import { passwordResetRequest } from '../../api/services/authService';
import type { PasswordResetRequest, MessageResponse } from "../../types/user";

export function usePasswordResetRequest() {
    return useMutation<MessageResponse, Error, PasswordResetRequest>({
        mutationFn: passwordResetRequest,
    });
}