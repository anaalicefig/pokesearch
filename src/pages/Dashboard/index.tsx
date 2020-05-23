import React, { useEffect, useState, useCallback, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import { Form, Cards, Error } from './styles'

interface Pokemon {
  id: number
  name: string
  base_experience: number
  abilities: {
    ability: {
      name: string
      url: string
    }
  }[]
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('')
  const [pokemonName, setPokemonName] = useState('')
  const [pokemons, setPokomons] = useState<Pokemon[]>(() => {
    const storagedPokemons = localStorage.getItem('@Pokesearch:pokemons')

    if(storagedPokemons) {
      return JSON.parse(storagedPokemons)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('@Pokesearch:pokemons', JSON.stringify(pokemons))
  }, [pokemons])

  const handleAddPokemon = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
  
    try {      
      const response = await api.get<Pokemon>(`${pokemonName.toLowerCase()}`)
      const pokemon = response.data

      setPokomons([...pokemons, pokemon])
      setPokemonName('')  
      setInputError('')    
    } catch (error) {
      console.log('UOU')
      setInputError('Pokemon not found. Try again')
    }
  }, [pokemonName, pokemons]);

  return (
    <>
      <img src={logoImg} alt="Pokesearch"/>

      <Form hasError={!!inputError} onSubmit={handleAddPokemon}>
        <input
          type="text" 
          placeholder="Type the name of the pokémon"
          value={pokemonName}
          onChange={e => setPokemonName(e.target.value)}
        />
        <button type="submit">Search</button>
      </Form>

      { inputError && <Error>{inputError}</Error>}

      <Cards>
        {pokemons.map(pokemon => (
          <div key={pokemon.id}>            
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt={pokemon.name}/>
            <ul>
              <li>{pokemon.name}</li>
              <li>Base Experience: {pokemon.base_experience}</li>
            </ul>
            <button>
              See details
              <FiChevronRight size={20}/>
            </button>
          </div>
        ))}     
      </Cards>
    </>
  )
}

export default Dashboard