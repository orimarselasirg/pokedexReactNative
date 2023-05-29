import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonsPaginated, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemon, setSimplePokemon] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemon = async() => {
    setIsLoading(true);
    const res  = await pokemonApi.get<PokemonsPaginated>(nextPageUrl.current);
    nextPageUrl.current = res.data.next;
    mapPokemonList(res.data.results);
    // console.log(JSON.stringify(res.data, null, 2));
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map( pokemon => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return { id: id, picture: picture, name: pokemon.name};
    });
    setSimplePokemon([...simplePokemon, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return {
    isLoading,
    simplePokemon,
    loadPokemon,
  };
};
