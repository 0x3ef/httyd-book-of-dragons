import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDragon } from '../../api/services/dragonService';

import type { Dragon, UpdateDragonVariables } from '../../types/dragon';

export function useUpdateDragon() {
    const queryClient = useQueryClient();

    return useMutation<Dragon, Error, UpdateDragonVariables>({
        mutationFn: ({ uid, data }) => updateDragon(uid, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['dragons'],
            });

            queryClient.invalidateQueries({
                queryKey: ['dragon', variables.uid],
            });
        },
    });
}