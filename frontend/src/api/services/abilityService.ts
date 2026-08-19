import api from '../client';
import type { Ability, AbilityCreateRequest } from '../../types/ability';

export async function getAbilities(): Promise<Ability[]> {
    const response = await api.get<Ability[]>('/abilities');
    return response.data;
}

export async function getAbility(uid: string): Promise<Ability> {
    const response = await api.get<Ability>(`/abilities/${uid}`);
    return response.data;
}

export async function createAbility(data: AbilityCreateRequest): Promise<Ability> {
    const response = await api.post<Ability>('/abilities', data);
    return response.data;
}

export async function deleteAbility(uid: string): Promise<void> {
    await api.delete(`/abilities/${uid}`);
}