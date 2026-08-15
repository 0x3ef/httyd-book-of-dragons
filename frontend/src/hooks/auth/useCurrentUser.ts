import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../api/services/authService';

export function useCurrentUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
    });
}