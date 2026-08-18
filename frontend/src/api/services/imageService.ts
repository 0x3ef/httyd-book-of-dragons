import api from '../client';
import type { Image, ImageCreateRequest } from '../../types/image';

export async function getImages(): Promise<Image[]> {
    const response = await api.get<Image[]>('/images');
    return response.data;
}

export async function getImage(uid: string): Promise<Image> {
    const response = await api.get<Image>(`/images/${uid}`);
    return response.data;
}

export async function createImage(data: ImageCreateRequest): Promise<Image> {
    const response = await api.post<Image>('/images', data);
    return response.data;
}

export async function deleteImage(uid: string): Promise<void> {
    await api.delete(`/images/${uid}`);
}