import { useQuery } from '@tanstack/react-query';
import { getAbility } from '../../api/services/abilityService';

export function useAbility(uid: string) {
    return useQuery({
        queryKey: ['ability', uid],
        queryFn: () => getAbility(uid),
        enabled: !!uid,
    });
}