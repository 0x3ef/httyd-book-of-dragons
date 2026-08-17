import api from '../client';

import type { Dragon, DragonCreateRequest, DragonUpdateRequest } from '../../types/dragon';

export async function getDragons(): Promise<Dragon[]> {
    const response = await api.get<Dragon[]>('/dragons');
    return response.data;
}

export async function getDragon(uid: string): Promise<Dragon> {
    const response = await api.get<Dragon>(`/dragons/${uid}`);
    return response.data;
}

export async function createDragon(data: DragonCreateRequest): Promise<Dragon> {
    const response = await api.post<Dragon>('/dragons', data);
    return response.data;
}

export async function updateDragon(uid: string, data: DragonUpdateRequest): Promise<Dragon> {
    const response = await api.patch<Dragon>(`/dragons/${uid}`,data);
    return response.data;
}

export async function deleteDragon(uid: string): Promise<void> {
    await api.delete(`/dragons/${uid}`);
}