import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createImage } from '../../api/services/imageService';
import type { Image, ImageCreateRequest } from '../../types/image';

export function useCreateImage() {
    const queryClient = useQueryClient();

    return useMutation<Image, Error, ImageCreateRequest>({
        mutationFn: createImage,

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