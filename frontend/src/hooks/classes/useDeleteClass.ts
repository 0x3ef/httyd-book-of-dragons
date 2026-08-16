import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteClass } from '../../api/services/classService';

export function useDeleteClass() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: deleteClass,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['classes'],
            });
        },
    });
}