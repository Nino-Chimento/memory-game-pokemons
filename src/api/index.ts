import { GetPokemon, Pokemon } from "../model";


export const getPokemons = async (): Promise<GetPokemon[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=4`);
    const data = await response.json();
    return data.results;
}

export const getPokemon = async (url: string): Promise<Pokemon> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}