/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PokemonDetails } from '../interfaces/pokemonDetailInterface';
import { FadeInImage } from './FadeInImage';



interface Props {
  pokemon: PokemonDetails
}

export const PokemonDetailComponent = ({pokemon}: Props) => {
  return (
    <ScrollView
      style={{...StyleSheet.absoluteFillObject, marginHorizontal: 10}}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container} />
        <Text style={styles.title}>Types</Text>
        {/* Types */}
        <View style={{flexDirection: 'row'}}>
          {
            pokemon.types.map(({type}) =>
              <Text
                style={styles.typeText}
                key={type.name}
              >
                {type.name}
              </Text>
            )
          }
        </View>
        {/* Pesos */}
        <View
          style={{...styles.container, marginTop: 20}}
        >
          <Text style={styles.title}>Peso</Text>
          <Text style={styles.typeText}>{pokemon.weight} Kg</Text>
        </View>
        {/* sprites */}
        <View
          style={{...styles.container, marginTop: 20}}
        >
          <Text style={styles.title}>Sprites</Text>
          <ScrollView
            style={styles.scrollContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.sprites}
            />
            <FadeInImage
              uri={pokemon.sprites.front_shiny}
              style={styles.sprites}
            />
            <FadeInImage
              uri={pokemon.sprites.back_shiny}
              style={styles.sprites}
            />
            <FadeInImage
              uri={pokemon.sprites.back_default}
              style={styles.sprites}
            />
          </ScrollView>
        </View>
        <View
          style={{...styles.container, marginTop: 10}}
        >
          <Text style={styles.title}>Habilidades</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              pokemon.moves.map(({move}) =>
                <Text
                  style={styles.typeText}
                  key={move.name}
                >
                  {move.name}
                </Text>
              )
            }
          </View>
        </View>
        {/* Stats */}
        <View
          style={{...styles.container, marginTop: 10}}
        >
          <Text style={styles.title}>Estados</Text>
          <View>
            {
              pokemon.stats.map((stat, index) =>
              <View style={{flexDirection:'row'}}>
                <Text
                  style={{...styles.typeText, width: 150}}
                  key={stat.stat.name + index}
                >
                  {stat.stat.name}
                </Text>
                <Text
                  style={{...styles.typeText, fontWeight: 'bold'}}
                  key={stat.base_stat}
                >
                  {stat.base_stat}
                </Text>
              </View>
              )
            }
          </View>
          <View
            style={{marginBottom: 30, alignItems: 'center', marginTop: 30}}
          >
            <FadeInImage
                uri={pokemon.sprites.front_default}
                style={styles.sprites}
            />
          </View>
        </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    // flx: 1,
    marginTop: 420,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  typeText:{
    fontSize: 17,
    marginRight: 10,
  },
  scrollContainer:{
    // backgroundColor: 'red',
  },
  sprites:{
    width: 100,
    height: 100,
  },
});
