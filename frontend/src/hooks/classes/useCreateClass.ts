import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClass } from '../../api/services/classService';
import type { DragonClass, DragonClassCreateRequest } from '../../types/dragonClass';

export function useCreateClass() {
    const queryClient = useQueryClient();

    return useMutation<DragonClass, Error, DragonClassCreateRequest>({
        mutationFn: createClass,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['classes'],
            });
        },
    });
}