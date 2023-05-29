/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabHome } from './TabHome';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabsSearchComponent } from './TabSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarStyle: {
          backgroundColor:'rgba(255,255,255, 0.85)',
          position: 'absolute',
          // opacity: 0.5,
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 0 : 70,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={TabHome}
        options = {{
          tabBarLabel: 'Pokemons',
          tabBarIcon: ({color})=><Icon color={color} size={20} name="list-outline"/>,
          headerShown: false,
        }}
        />
      <Tab.Screen
        name="SeachScreen"
        component={TabsSearchComponent}
        options = {{
          tabBarLabel: 'Pokemons',
          tabBarIcon: ({color})=><Icon color={color} size={20} name="search-outline"/>,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
