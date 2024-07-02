import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';

import BadgeIcon from '../components/common/BadgeIcon';
import Preferences from '../components/specific/Preferences';
import Favourites from '../components/specific/Favourites';
import ProfilShop from '../components/specific/ProfileShop';
import Basket from '../components/specific/Basket';


import badgeIconStyles from '../styles/badgeIconStyles';

//Contexte
import { FavouritesProvider } from '../context/FavouritesContext';

const Tab = createBottomTabNavigator();



const HomeNavigation = () => {
  //const navigationState = useNavigationState(state => state);
  //const currentRouteName = navigationState.routes[navigationState.index].name;

  return (
    <Tab.Navigator initialRouteName='Shop'
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [{"display": route.name == "Home" ? 'none' : 'flex', bottom:StatusBar.currentHeight,}, null],


          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let badgeCount = 0;

            if (route.name === 'Home') {
              iconName = focused ? "home" : "home-outline";
              badgeCount = 0;
            } else if (route.name === 'Favourites') {
              iconName = focused ? 'heart-sharp' : 'heart-outline';
              badgeCount = 3;
            } else if (route.name === 'Shop') {
              iconName = focused ? 'bag-handle' : 'bag-handle-outline';
              badgeCount = 3;
            } else if (route.name === 'Basket') {
              iconName = focused ? 'basket' : 'basket-outline';
              badgeCount = 3;
            } else if (route.name === 'Account') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              badgeCount = 3;
            }
            return <BadgeIcon name={iconName} size={size} color={color} badgeCount={badgeCount} styles={badgeIconStyles} />;
          },
        })}
        
      >
            <Tab.Screen name="Home" component={Preferences} />
            <Tab.Screen name="Favourites" component={Favourites} />
            <Tab.Screen name="Shop" component={ProfilShop} />
            <Tab.Screen name="Basket" component={Basket} options={{ title: 'Mon Panier', headerShown : true, tabBarVisible: false, }} />
            <Tab.Screen name="Account" component={Preferences} />
        </Tab.Navigator>

 
)}
export default HomeNavigation