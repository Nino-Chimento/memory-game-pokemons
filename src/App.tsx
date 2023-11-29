

import { useState, useEffect } from 'react'
import { Spinner, AlertError, CardPokemon } from './components/index'
import { usePokemonFetch } from "./usePokemonFetch"
import { PokemonCard } from './model';
import { Container, MainView, StyledMemoryTitle } from './styled/AppStyled';
function App() {
  const { pokemoncards: data, error, isLoading, errorPokemonCards, isLoadingPokemonCards } = usePokemonFetch()
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([])
  const [openCards, setOpenCards] = useState<number[]>([])
  const [cardFlippedFirst, setCardFlippedFirst] = useState<PokemonCard | null>()
  const [cardFlippedSecond, setCardFlippedSecond] = useState<PokemonCard | null>()

  useEffect(() => {
    if (data) {
      const shuffle = (): number => Math.random() - 0.5;
      const result = data.sort(shuffle)
      setPokemonCards(result)
    }
  }, [data])

  const closeCards = () => {
    const coverCards = pokemonCards.map(pokemon => {
      return { ...pokemon, isTurned: false }
    })
    setPokemonCards(coverCards)
  }

  useEffect(() => {
    if (cardFlippedFirst && cardFlippedFirst.id === cardFlippedSecond?.id) {
      console.log("match");
      setCardFlippedFirst(null)
      setCardFlippedSecond(null)
      return setOpenCards(prev => [...prev, cardFlippedFirst?.id, cardFlippedSecond?.id])
    } if (cardFlippedSecond) {
      setTimeout(() => closeCards(), 1000);
      setCardFlippedFirst(null)
      setCardFlippedSecond(null)

    }

  }, [cardFlippedFirst, cardFlippedSecond, openCards.length, pokemonCards])



  if (isLoading || isLoadingPokemonCards) return <Spinner />
  if (error || errorPokemonCards) return <AlertError />

  const handlerFlip = (indexPokemon: number) => {
    const pokemonFlip = pokemonCards.map((pokemon, index) => {
      if (index === indexPokemon) {
        !cardFlippedFirst ? setCardFlippedFirst(pokemon) : setCardFlippedSecond(pokemon)
        return { ...pokemon, isTurned: true }
      }
      return pokemon
    })
    setPokemonCards(pokemonFlip)
  }






  return (<Container>
    <StyledMemoryTitle>Memory Game</StyledMemoryTitle>
    <MainView>
      {pokemonCards?.map((pokemon, index) => <CardPokemon index={index} key={`${pokemon.id}.${index}`} imageUrl={pokemon.imageUrl} onTurn={() => handlerFlip(index)} isTurned={pokemon.isTurned} />)}
    </MainView>
  </Container>
  )
}

export default App
