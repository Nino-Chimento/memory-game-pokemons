export interface GetPokemon {
    name: string;
    url: string
}

export interface PokemonCard {
    name: string;
    imageUrl: string;
    id: number;
    isTurned: boolean;
    isDisabled: boolean;
}

export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    game_indices: GameIndice[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    species: Species;
    sprites: Sprite;
    stats: Stats[];
    types: Type[];
    weight: number;
}

interface Type {
    slot: number;
    type: TypeDetail;
}

interface TypeDetail {
    name: string;
    url: string;
}

interface Sprite {
    back_default: string;
    front_default: string;
}

interface Species {
    name: string;
    url: string;
}
interface Move {
    move: MoveDetail;
    version_group_details: VersionGroupDetail[];
}
interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: MoveLearnMethod;
}

interface MoveLearnMethod {
    name: string;
    url: string;
}
interface MoveDetail {
    name: string;
    url: string;
}

interface HeldItem {
    item: Item;
    version_details: VersionDetail[];
}

interface VersionDetail {
    rarity: number;
    version: Version;

}

interface Item {
    name: string;
    url: string;
}
interface GameIndice {
    game_index: number;
    version: Version;
}

interface Version {
    name: string;
    url: string;
}

interface Ability {
    name: string;
    url: string;
    is_hidden: boolean;
    slot: number;
}
export interface Stat {
    name: string;
    url: string
}

export interface Stats {
    stat: Stat;
    base_stat: number;
    effort: number;
}