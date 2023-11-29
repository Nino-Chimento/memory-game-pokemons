

import { useState, useEffect } from 'react'
import { Spinner, AlertError, CardPokemon } from './components/index'
import { usePokemonFetch } from "./usePokemonFetch"
import { PokemonCard } from './model';
import { Container, MainView, StyledMemoryTitle } from './styled/AppStyled';
function App() {
  const { pokemoncards: data, error, isLoading, errorPokemonCards, isLoadingPokemonCards } = usePokemonFetch()
  const [pokemoncards, setPokemoncards] = useState<PokemonCard[]>()
  useEffect(() => {
    if (data) setPokemoncards(data)
  }, [data])

  if (isLoading || isLoadingPokemonCards) return <Spinner />
  if (error || errorPokemonCards) return <AlertError />


  return (<Container>
    <StyledMemoryTitle>Memory Game</StyledMemoryTitle>
    <MainView>
      {pokemoncards?.map((pokemon, index) => <CardPokemon key={`${pokemon.id}.${index}`} imageUrl={pokemon.imageUrl} id={pokemon.id} onTurn={(id) => console.log(id)
      } isTurned={pokemon.isTurned} />)}
    </MainView>
  </Container>
  )
}

export default App
