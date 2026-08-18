import { useQuery } from '@tanstack/react-query';
import { getImage } from '../../api/services/imageService';

export function useImage(uid: string) {
    return useQuery({
        queryKey: ['image', uid],
        queryFn: () => getImage(uid),
        enabled: !!uid,
    });
}