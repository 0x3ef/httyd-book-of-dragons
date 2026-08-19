import { useQuery } from '@tanstack/react-query';
import { getAbilities } from '../../api/services/abilityService';

export function useAbilities() {
    return useQuery({
        queryKey: ['abilities'],
        queryFn: getAbilities,
    });
}