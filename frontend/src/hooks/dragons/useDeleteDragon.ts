import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDragon } from '../../api/services/dragonService';

export function useDeleteDragon() {
    const queryClient = useQueryClient();
    
    return useMutation<void, Error, string>({
        mutationFn: deleteDragon,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dragons'],
            });
        },
    });
}