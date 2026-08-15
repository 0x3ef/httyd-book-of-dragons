import { useQueryClient, useMutation } from '@tanstack/react-query';
import { revokeToken } from '../../api/services/authService';

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: revokeToken,
        onSettled: () => {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');

            queryClient.removeQueries({
                queryKey: ['currentUser']
            });
        }
    });
}
