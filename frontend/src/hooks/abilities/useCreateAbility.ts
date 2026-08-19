import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAbility } from '../../api/services/abilityService';
import type { Ability, AbilityCreateRequest } from '../../types/ability';

export function useCreateAbility() {
    const queryClient = useQueryClient();

    return useMutation<Ability, Error, AbilityCreateRequest>({
        mutationFn: createAbility,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['abilities'],
            });
        },
    });
}