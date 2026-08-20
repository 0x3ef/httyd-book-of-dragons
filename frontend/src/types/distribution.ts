export interface Distribution {
    uid: string;
    name: string;
    alternatenames: string;
    created_at: string;
    updated_at: string;
    dragons_uids?: string[] | null;
}

export interface DistributionCreateRequest {
    name: string;
    alternatenames: string;
}