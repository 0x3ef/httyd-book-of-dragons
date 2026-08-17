import { useQuery } from '@tanstack/react-query';
import { getDragon } from '../../api/services/dragonService.ts';

export function useDragon(uid: string) {
    return useQuery({
        queryKey: ["dragon", uid],
        queryFn: () => getDragon(uid),
        enabled: Boolean(uid),
    });
}
