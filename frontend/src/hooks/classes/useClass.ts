import { useQuery } from '@tanstack/react-query';
import { getClass } from '../../api/services/classService';

export function useClass(uid: string) {
    return useQuery({
        queryKey: ['classes', uid],
        queryFn: () => getClass(uid),
        enabled: uid.length > 0,
    });
}
