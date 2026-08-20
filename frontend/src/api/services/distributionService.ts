import api from '../client';
import type { Distribution, DistributionCreateRequest } from '../../types/distribution';

export async function getDistributions(): Promise<Distribution[]> {
    const response = await api.get<Distribution[]>('/distributions');
    return response.data;
}

export async function getDistribution(uid: string): Promise<Distribution> {
    const response = await api.get<Distribution>(`/distributions/${uid}`);
    return response.data;
}

export async function createDistribution(data: DistributionCreateRequest): Promise<Distribution> {
    const response = await api.post<Distribution>('/distributions', data);
    return response.data;
}

export async function deleteDistribution(uid: string): Promise<void> {
    await api.delete(`/distributions/${uid}`);
}