import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BadgeIcon from '../components/common/BadgeIcon';
import Search from '../components/specific/Search';
import ProductDetails from '../components/specific/ProductDetails';
import Offers from '../components/specific/Offers';


import HomeNavigation from '../navigation/HomeNavigation';

//Contexts
import { FilterProvider } from '../context/FilterContext';


const Stack = createStackNavigator();


export default function MainNavigation() {
  const hide = false

  return (
    <FilterProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Offers">
          <Stack.Screen name="Preferences" component={HomeNavigation} options={{ title: 'Home', headerShown : false, }} />
          <Stack.Screen name="Search" component={Search}  options={{ title: 'Search', headerShown : false, }} />
          <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{ title: 'Product Details', headerShown : false, tabBarVisible: false, }} />
          <Stack.Screen name="Offers" component={Offers}  options={{ title: 'Offers', headerShown : false, tabBarVisible: false, }} />

        </Stack.Navigator>
      </NavigationContainer>
    </FilterProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



