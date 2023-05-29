import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from './TabHome';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SeachScreen } from '../screens/SeachScreen';

const TabSearch = createNativeStackNavigator<RootStackParams>();

export const TabsSearchComponent = () => {
  return (
    <TabSearch.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle:{
          backgroundColor: 'white',
        },
      }}
    >
      <TabSearch.Screen name="Home" component={SeachScreen} />
      <TabSearch.Screen name="PokemonScreen" component={PokemonScreen} />
    </TabSearch.Navigator>
  );
};
