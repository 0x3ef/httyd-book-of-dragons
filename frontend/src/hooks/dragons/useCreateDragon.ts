import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDragon } from '../../api/services/dragonService';
import type { Dragon, DragonCreateRequest} from '../../types/dragon';

export function useCreateDragon() {
    const queryClient = useQueryClient();
    return useMutation<Dragon, Error, DragonCreateRequest>({
        mutationFn: createDragon,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dragons'],
            });
        },
    });
}