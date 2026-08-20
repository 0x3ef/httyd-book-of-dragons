import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDistribution } from '../../api/services/distributionService';
import type { Distribution, DistributionCreateRequest } from '../../types/distribution';

export function useCreateDistribution() {
    const queryClient = useQueryClient();

    return useMutation<Distribution, Error, DistributionCreateRequest>({
        mutationFn: createDistribution,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['distributions'],
            });
        },
    });
}