import { useQuery } from '@tanstack/react-query';
import { getDragons } from '../../api/services/dragonService';

export function useDragons() {
    return useQuery({
        queryKey: ['dragons'],
        queryFn: getDragons, 
    });
}
