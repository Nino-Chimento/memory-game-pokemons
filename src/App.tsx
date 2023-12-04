import { useState, useEffect, useCallback } from 'react'
import { Spinner, AlertError, CardPokemon } from './components/index'
import { usePokemonFetch } from "./usePokemonFetch"
import { PokemonCard } from './model';
import { Container, StyledMemoryTitle, ContainerCards, View, ContainerTitle } from './styled/AppStyled';
import { Button } from '@mui/material';
function App() {
  const { pokemonCards: data, error, isLoading, errorPokemonCards, isLoadingPokemonCards } = usePokemonFetch()
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([])
  const [countMoves, setCountMove] = useState(0)
  const [openCards, setOpenCards] = useState<number[]>([])
  const [cardFlippedFirst, setCardFlippedFirst] = useState<PokemonCard | null>()
  const [cardFlippedSecond, setCardFlippedSecond] = useState<PokemonCard | null>()
  const [cardFlippedIndex, setCardFlippedIndex] = useState<number | null>()

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
    setOpenCards([])
    setCountMove(0)
  }, [pokemonCards])

  const closeCardsNotFlipped = useCallback(() => {
    const coverCards = pokemonCards.map(pokemon => {
      if (openCards.includes(pokemon.id)) {
        return { ...pokemon, isTurned: true }
      }
      return { ...pokemon, isTurned: false }
    })
    setPokemonCards(coverCards)
  }, [openCards, pokemonCards])


  const setNullCardsSelect = () => {
    setCardFlippedFirst(null)
    setCardFlippedSecond(null)
    setCardFlippedIndex(null)
  }

  useEffect(() => {
    if (cardFlippedFirst && cardFlippedFirst.id === cardFlippedSecond?.id) {
      setNullCardsSelect()
      setOpenCards(prev => [...prev, cardFlippedFirst?.id, cardFlippedSecond?.id])
    }
    if (cardFlippedSecond && cardFlippedFirst && cardFlippedSecond?.id !== cardFlippedFirst.id) {
      setTimeout(() => {
        setNullCardsSelect()
        closeCardsNotFlipped()
      }, 1000);
    }
    if (cardFlippedFirst && cardFlippedSecond) {
      setCountMove(prev => prev + 1)
    }

  }, [cardFlippedFirst, cardFlippedSecond, closeCards, closeCardsNotFlipped, pokemonCards])

  const handlerFlip = (indexPokemon: number) => {
    const pokemonFlip = pokemonCards.map((pokemon, index) => {
      if (index === indexPokemon) {
        setCardFlippedIndex(indexPokemon)
        !cardFlippedFirst ? setCardFlippedFirst(pokemon) : setCardFlippedSecond(pokemon)
        return { ...pokemon, isTurned: true }
      }
      return pokemon
    })
    setPokemonCards(pokemonFlip)
  }
  const cardPokemonIsDisabled = (index: number, id: number) => Boolean(cardFlippedFirst && cardFlippedSecond) || index === cardFlippedIndex || openCards.includes(id)
  if (isLoading || isLoadingPokemonCards) return <Spinner />
  if (error || errorPokemonCards) return <AlertError />

  return (
    <Container>
      <View>
        <ContainerTitle>
          <StyledMemoryTitle>Memory Game</StyledMemoryTitle>
          <StyledMemoryTitle>Your Moves {countMoves}</StyledMemoryTitle>

          {openCards.length === 8 && <>
            <StyledMemoryTitle>You Win!</StyledMemoryTitle>
            <Button onClick={() => closeCards()} variant="contained">Restart Game</Button>
          </>}
        </ContainerTitle>
        <ContainerCards>
          {pokemonCards?.map((pokemon, index) => <CardPokemon index={index} key={`${pokemon.id}.${index}`} imageUrl={pokemon.imageUrl} onTurn={() => handlerFlip(index)} isTurned={pokemon.isTurned} isDisabled={cardPokemonIsDisabled(index, pokemon.id)} />)}
        </ContainerCards>
      </View>
    </Container>
  )
}

export default App
