import { useQuery } from '@tanstack/react-query';
import { getDistributions } from '../../api/services/distributionService';

export function useDistributions() {
    return useQuery({
        queryKey: ['distributions'],
        queryFn: getDistributions,
    });
}