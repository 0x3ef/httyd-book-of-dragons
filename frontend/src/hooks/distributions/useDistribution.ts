import { useQuery } from '@tanstack/react-query';
import { getDistribution } from '../../api/services/distributionService';

export function useDistribution(uid: string) {
    return useQuery({
        queryKey: ['distribution', uid],
        queryFn: () => getDistribution(uid),
        enabled: !!uid,
    });
}