/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonList } from '../hooks/usePokemonsList';
import {styles as globalStyles} from '../theme/globalTheme';
import { PokemonCard } from '../components/PokemonCard';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export const SeachScreen = () => {
  const {top}  = useSafeAreaInsets();
  const {isFetching, simplePokemon}  = usePokemonList();
  const [textValue, setTextValue] =  useState('');
  const [pokemonListSearch, setPokemonListSearch] = useState<SimplePokemon[]>();

  const width = Dimensions.get('window').width;

  useEffect(()=>{
    if (textValue.length === 0){
      setPokemonListSearch([]);
    }

    // if (isNaN(Number(textValue))){
    //   const pokemonsFiltered =  simplePokemon.filter(pokemon => pokemon.name.toLowerCase().includes(textValue.toLowerCase()));
    //   setPokemonListSearch(pokemonsFiltered);
    // } else {
    //   setPokemonListSearch([simplePokemon.find((pokemon) => pokemon?.id === textValue)!]);
    // }

    setPokemonListSearch(
      simplePokemon.filter(poke =>
        (!isNaN(Number(textValue))
        ? poke.id === textValue
        : poke.name.toLowerCase().includes(textValue.toLowerCase()))
    ));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[textValue]);


  if (isFetching) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator
          size={70}
          color="grey"
        />
        <Text>
          Cargando...
        </Text>
      </View>
    );
  }
  return (
    <View style={{...styles.container}}>
      <SearchInput
        style={{
          position: 'absolute',
          zIndex: 876,
          width: width - 40,
          marginTop: 20,
        }}
        onDebounce={(value: string)=>{setTextValue(value);}}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={pokemonListSearch}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={<Text style={{...globalStyles.title, top: top + 20, marginBottom: top + 20, paddingBottom: 20, marginTop: Platform.OS === 'android' ?  top + 50 : top + 40}}>{textValue}</Text>}
          renderItem={({item}) => <PokemonCard pokemon={item}/>}

          // ListFooterComponent={<ActivityIndicator style={{height: 100}} size={20} color="green"/>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    marginHorizontal: 20,
  },
  activityContainer:{
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
