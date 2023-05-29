/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import { RootStackParams } from '../navigation/TabHome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetailComponent } from '../components/PokemonDetails';

interface Props extends StackScreenProps <RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route} : Props) => {
  const {simplePokemon, color} = route.params;
  const {name, id, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const {pokemon, isLoading} = usePokemon(id);
  // const {moves} = pokemon;
  return (
    <View style={{flex: 1}}>
      <View style={{...styles.pokemonDetailContainer, backgroundColor: color}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=> navigation.goBack()}
          style={{...styles.backArrow, top: top + 10}}
        >
          <Icon
            name= "arrow-back-outline"
            color="white"
            size={50}
          />
        </TouchableOpacity>

        <Text style={{... styles.titlePokemon, top: top + 50}}>
          {name + '\n'}#{id}
        </Text>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeBallImage}
        />

        <FadeInImage
          uri={picture}
          style={styles.imagePokemon}
            />
      </View>
      {
        isLoading
        ?
        <View style={styles.activity}>
            <ActivityIndicator
              color= {color}
              size={50}
            />
        </View>
        :
        <PokemonDetailComponent
          pokemon={pokemon}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonDetailContainer: {
    height: 400,
    backgroundColor: 'grey',
    Index: 100,
    alignItems: 'center',
    borderBottomEndRadius: 300,
    zIndex: 500,
  },
  pokeBallImage: {
    width: 250,
    height: 250,
    opacity: 0.5,
    top: 20,
  },
  backArrow:{
    position: 'absolute',
    left: 20,
  },
  titlePokemon: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-start',
    left: 25,
  },
  imagePokemon:{
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -25,
    // zIndex: 50,
  },
  activity:{
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
});
