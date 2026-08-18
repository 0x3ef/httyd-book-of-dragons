export interface Image {
    uid: string;
    dragon_uid: string | null;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface ImageCreateRequest {
    dragon_uid: string | null;
    url: string;
}