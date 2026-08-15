import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/services/authService';

export function useAuth() {
    const query = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false,
    });

    return {
        user: query.data,
        isAuthenticated: !!query.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}