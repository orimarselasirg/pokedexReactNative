import {useState, useEffect} from 'react';
import { PokemonDetails } from '../interfaces/pokemonDetailInterface';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetails>({} as PokemonDetails);

  const loadPokemon = async() =>{
    const res = await pokemonApi.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon(res.data);
    setIsLoading(false);
  };

  useEffect(()=>{
    setIsLoading(true);
    loadPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return {
    isLoading,
    pokemon,
  };
};
