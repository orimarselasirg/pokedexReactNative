import React, { useEffect, useState } from 'react';
import { getColors } from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

interface Props {
  pokemon: SimplePokemon
}

const widthWindow = Dimensions.get('window').width;


export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<any>();
  const url = pokemon.picture;

  const fetchColor = async ()=>{
    const colors = await getColors(url, {
      fallback: '#000000',
      pixelSpacing: 5,
    });

    colors.platform === 'ios' ? setBgColor(colors.background || 'grey') : setBgColor(colors.dominant || 'grey');

};

  useEffect(()=>{
    isMounted.current ? fetchColor() : null;
    return () =>{
      isMounted.current = false;
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (

    <TouchableOpacity
      activeOpacity={0.7}
      onPress={()=> navigation.navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})}
    >
      <View style={{...styles.cardContainer, backgroundColor: bgColor}}>
        <FadeInImage
          uri={pokemon.picture}
          style={styles.imagePokemon}
        />
        <View>
          <Text style={styles.namePokemon}>{pokemon.name}{'\n#' + pokemon.id}</Text>
        </View>
        <View style={styles.pokeballContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokeball}
          />
        </View>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer:{
    marginHorizontal: 10,
    // backgroundColor: 'red',
    height: 120,
    width: widthWindow * 0.4,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    // overflow: 'hidden',
  },
  pokeballContainer: {
    overflow: 'hidden',
    // backgroundColor:'blue',
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.4,
  },
  namePokemon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10,
  },
  imagePokemon: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -5,
    right: -8,
    zIndex: 2,
  },
  pokeball:{
    width: 100,
    height: 100,
    // position: 'absolute',
    bottom: -20,
    right: -20,
  },
});
