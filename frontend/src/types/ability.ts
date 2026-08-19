export interface Ability {
    uid: string;
    name: string;
    created_at: string;
    updated_at: string;
    dragons_uids: string[] | null; 
}

export interface AbilityCreateRequest {
    name: string;
}