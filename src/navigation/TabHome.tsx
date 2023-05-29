import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';


export type RootStackParams = {
  Home: undefined,
  PokemonScreen: { simplePokemon: SimplePokemon, color: string }
}

const Stack = createNativeStackNavigator<RootStackParams>();

export const TabHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle:{
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
