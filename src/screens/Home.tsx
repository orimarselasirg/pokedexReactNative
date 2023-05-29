/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, FlatList, ActivityIndicator, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../theme/globalTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';



export const Home = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemon, loadPokemon} = usePokemonPaginated();
  return (
    <View style={styles.globalMargin}>
      {/* <Icon
        name="ios-person"
        size={80}
        color="#900"
      /> */}
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      {/* <Text style={{...styles.title, top: top + 20}}>Pokedex</Text> */}
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemon}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={<Text style={{...styles.title, top: top + 20, marginBottom: top + 20, paddingBottom: 20}}>Pokedex</Text>}
          renderItem={({item}) => <PokemonCard pokemon={item}/>}
          onEndReached={loadPokemon}
          onEndReachedThreshold={0.4}
          ListFooterComponent={<ActivityIndicator style={{height: 100}} size={20} color="green"/>}
        />
      </View>
    </View>
  );
};
