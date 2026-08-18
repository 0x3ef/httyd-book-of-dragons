import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImage } from '../../api/services/imageService';

export function useDeleteImage() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: deleteImage,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['images'],
            });

            queryClient.invalidateQueries({
                queryKey: ['dragons'],
            });
        },
    });
}