import { useMutation } from '@tanstack/react-query';
import { refreshToken } from '../../api/services/authService';

export function useRefreshToken() {
    return useMutation({
        mutationFn: refreshToken,
    });
}