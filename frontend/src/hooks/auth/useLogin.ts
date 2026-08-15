import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUsers } from '../../api/services/authService';
import type { LoginRequest, LoginResponse } from '../../types/user';

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: loginUsers,

        onSuccess: async (response) => {
            sessionStorage.setItem('access_token', response.access_token);
            sessionStorage.setItem('refresh_token', response.refresh_token);
            await queryClient.invalidateQueries({
                queryKey: ['currentUser'],
            });
        },
    });
}