import { useState, useEffect, useCallback } from 'react'
import { Spinner, AlertError, CardPokemon } from './components/index'
import { usePokemonFetch } from "./usePokemonFetch"
import { PokemonCard } from './model';
import { Container, MainView, StyledMemoryTitle } from './styled/AppStyled';
import { Button } from '@mui/material';
function App() {
  const { pokemonCards: data, error, isLoading, errorPokemonCards, isLoadingPokemonCards } = usePokemonFetch()
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([])
  const [countMoves, setCountMove] = useState(0)
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

  const closeCards = useCallback(() => {
    const coverCards = pokemonCards.map(pokemon => {
      return { ...pokemon, isTurned: false }
    })
    setPokemonCards(coverCards)
  }, [pokemonCards])

  useEffect(() => {

    if (cardFlippedFirst && cardFlippedFirst.id === cardFlippedSecond?.id) {
      setOpenCards(prev => [...prev, cardFlippedFirst?.id, cardFlippedSecond?.id])
    }
    if (cardFlippedSecond && cardFlippedFirst && cardFlippedSecond?.id !== cardFlippedFirst.id) {
      setTimeout(() => closeCards(), 1000);
      setOpenCards([])
    }
    if (cardFlippedFirst && cardFlippedSecond) {
      setCardFlippedFirst(null)
      setCardFlippedSecond(null)
      setCountMove(prev => prev + 1)
    }

  }, [cardFlippedFirst, cardFlippedSecond, closeCards, pokemonCards])



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
    <StyledMemoryTitle>Your Moves {countMoves}</StyledMemoryTitle>

    {openCards.length === 8 && <>
      <StyledMemoryTitle>You Win!</StyledMemoryTitle>
      <Button onClick={() => closeCards()} variant="contained">Restart Game</Button>
    </>}
    <MainView>
      {pokemonCards?.map((pokemon, index) => <CardPokemon index={index} key={`${pokemon.id}.${index}`} imageUrl={pokemon.imageUrl} onTurn={() => handlerFlip(index)} isTurned={pokemon.isTurned} />)}
    </MainView>
  </Container>
  )
}

export default App
