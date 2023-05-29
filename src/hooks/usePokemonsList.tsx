import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonsPaginated, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonList = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemon, setSimplePokemon] = useState<SimplePokemon[]>([]);
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1200';

  const loadPokemon = async() => {
    const res  = await pokemonApi.get<PokemonsPaginated>(url);
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
    setSimplePokemon(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return {
    isFetching,
    simplePokemon,
    loadPokemon,
  };
};
