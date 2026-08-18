import { useQuery } from '@tanstack/react-query';
import { getImages } from '../../api/services/imageService';

export function useImages() {
    return useQuery({
        queryKey: ['images'],
        queryFn: getImages,
    });
}