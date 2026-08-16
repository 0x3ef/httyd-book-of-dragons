export interface DragonClass {
    uid: string;
    name: string;
    description: string;
    icon: string | null;
    created_at: string;
    updated_at: string;
}

export interface DragonClassCreateRequest {
    name: string;
    description: string;
    icon?: string | null;
}

export interface DragonClassUpdateRequest {
    name?: string | null;
    description?: string | null;
    icon?: string | null;
}

export interface UpdateClassVariables {
    uid: string;
    data: DragonClassUpdateRequest;
}