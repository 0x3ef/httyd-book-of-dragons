import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDistribution } from '../../api/services/distributionService';

export function useDeleteDistribution() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: deleteDistribution,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['distributions'],
            });
        },
    });
}