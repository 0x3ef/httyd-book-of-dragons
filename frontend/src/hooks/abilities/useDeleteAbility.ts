import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAbility } from '../../api/services/abilityService';

export function useDeleteAbility() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: deleteAbility,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['abilities'],
            });
        },
    });
}