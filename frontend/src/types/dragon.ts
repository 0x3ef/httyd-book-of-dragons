import type { Ability } from './ability'
import type { Distribution } from './distribution'
import type { DragonClass } from './dragonClass'
import type { Image } from './image'

export interface Dragon {
    uid: string;
    species: string;
    firetype: string;

    features: string[];
    colors: string[];
    diet: string[];
    habitat: string[];

    size: string;
    weight: number;
    wingspan: number;
    trainable: boolean;

    attack: number;
    speed: number;
    armor: number;
    firepower: number;
    shotlimit: number;
    venom: number;
    jawstrength: number;
    stealth: number;

    created_at: string;
    updated_at: string;

    dragon_class: DragonClass | null;
    abilities: Ability[];
    distributions: Distribution[];
    images: Image[];
}

export interface DragonCreateRequest {
    species: string;
    firetype: string;
    features: string[];
    colors: string[];
    diet: string[];
    habitat: string[];
    size: string;
    weight: number;
    wingspan: number;
    trainable: boolean;
    attack: number;
    speed: number;
    armor: number;
    firepower: number;
    shotlimit: number;
    venom: number;
    jawstrength: number;
    stealth: number;
    class_uid?: string | null;
    abilities?: string[];
    distributions?: string[];
}

export interface DragonUpdateRequest {
    species?: string | null;
    firetype?: string | null;

    features_add?: string[] | null;
    features_remove?: string[] | null;

    colors_add?: string[] | null;
    colors_remove?: string[] | null;

    diet_add?: string[] | null;
    diet_remove?: string[] | null;

    habitat_add?: string[] | null;
    habitat_remove?: string[] | null;

    size?: string | null;
    weight?: number | null;
    wingspan?: number | null;

    trainable?: boolean | null;

    attack?: number | null;
    speed?: number | null;
    armor?: number | null;
    firepower?: number | null;
    shotlimit?: number | null;
    venom?: number | null;
    jawstrength?: number | null;
    stealth?: number | null;

    class_uid?: string | null;

    ability_uids_add?: string[];
    ability_uids_remove?: string[];

    distribution_uids_add?: string[];
    distribution_uids_remove?: string[];
}

export interface UpdateDragonVariables {
    uid: string;
    data: DragonUpdateRequest;
}