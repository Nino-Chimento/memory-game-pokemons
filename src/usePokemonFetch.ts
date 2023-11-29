import { useEffect, useState } from "react";
import { PokemonCard, GetPokemon } from "./model";
import { getPokemon, getPokemons } from "./api";
import {
    useQuery,
} from '@tanstack/react-query'


export const usePokemonFetch = () => {
    const [pokemoncards, setPokemonCards] = useState<PokemonCard[]>()
    const [errorPokemonCards, setErrorPokemonCards] = useState()
    const [isLoadingPokemonCards, setIsLoadingPokemonCards] = useState(false)
    const { isLoading, error, data: pokemons } = useQuery({
        queryKey: ['getPokemons'],
        queryFn: getPokemons
    })
    const getPokemonCards = async (pokemons: GetPokemon[]) => {
        setIsLoadingPokemonCards(true)
        await Promise.all(
            pokemons?.map(async (pokemon: GetPokemon) => {
                const response = await getPokemon(pokemon.url);
                return { name: response.name, imageUrl: response.sprites.front_default, isTurned: false, id: response.id };
            })
        ).then(function (result) {
            setPokemonCards(result.concat(result))
        }).catch(function (err) {
            setErrorPokemonCards(err)
        })
        setIsLoadingPokemonCards(false)
    }

    useEffect(() => {
        if (pokemons && pokemons?.length > 0) {
            getPokemonCards(pokemons)
        }
    }, [pokemons])

    return {
        pokemoncards, error, isLoading, errorPokemonCards, isLoadingPokemonCards
    }
}