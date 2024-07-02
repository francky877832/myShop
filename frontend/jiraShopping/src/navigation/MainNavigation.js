import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BadgeIcon from '../components/common/BadgeIcon';
import Search from '../components/specific/Search';
import ProductDetails from '../components/specific/ProductDetails';
import Offers from '../components/specific/Offers';
import AllCommets from '../components/specific/AllCommets';

import HomeNavigation from '../navigation/HomeNavigation';

//Contexts
import { FilterProvider } from '../context/FilterContext';
import { FavouritesProvider } from '../context/FavouritesContext';

const Stack = createStackNavigator();


export default function MainNavigation() {
  const hide = false

  return (
    <FavouritesProvider>
      <FilterProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Preferences">
            <Stack.Screen name="Preferences" component={HomeNavigation} options={{ title: 'Home', headerShown : false, tabBarVisible: true }} />
            <Stack.Screen name="Search" component={Search}  options={{ title: 'Search', headerShown : false, }} />
            <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{ title: 'Product Details', headerShown : false, tabBarVisible: false, }} />
            <Stack.Screen name="Offers" component={Offers}  options={{ title: 'Propositions', headerShown : true, tabBarVisible: false, }} />
            <Stack.Screen name="AllComments" component={AllCommets}  options={{ title: 'All Comments', headerShown : true, tabBarVisible: false, }} />

          </Stack.Navigator>
        </NavigationContainer>
      </FilterProvider>
    </FavouritesProvider>
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



