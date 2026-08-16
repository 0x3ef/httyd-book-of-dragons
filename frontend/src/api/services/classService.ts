import api from '../client';
import type { DragonClass, DragonClassCreateRequest, DragonClassUpdateRequest } from '../../types/dragonClass';

export async function getClasses(): Promise<DragonClass[]> {
    const response = await api.get<DragonClass[]>('/classes');
    return response.data;
}

export async function getClass(uid: string): Promise<DragonClass> {
    const response = await api.get<DragonClass>(`/classes/${uid}`);
    return response.data;
}

export async function createClass(data: DragonClassCreateRequest): Promise<DragonClass> {
    const response = await api.post<DragonClass>('/classes', data);
    return response.data;
}

export async function updateClass(uid: string, data: DragonClassUpdateRequest): Promise<DragonClass> {
    const response = await api.patch<DragonClass>(`/classes/${uid}`, data);
    return response.data;
}

export async function deleteClass(uid: string): Promise<void> {
    await api.delete(`/classes/${uid}`);
}