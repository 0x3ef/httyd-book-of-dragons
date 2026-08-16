import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClass } from '../../api/services/classService';
import type { DragonClass, UpdateClassVariables } from '../../types/dragonClass';

export function useUpdateClass() {
    const queryClient = useQueryClient();

    return useMutation<DragonClass, Error, UpdateClassVariables>({
        mutationFn: ({ uid, data }) =>
            updateClass(uid, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['classes'],
            });

            queryClient.invalidateQueries({
                queryKey: ['class', variables.uid],
            });
        },
    });
}