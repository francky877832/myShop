import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import BadgeIcon from '../components/common/BadgeIcon';
import Preferences from '../components/specific/Preferences';
import Search from '../components/specific/Search';
import ProductDetails from '../components/specific/ProductDetails';
import Favourites from '../components/specific/Favourites';

import badgeIconStyles from '../styles/badgeIconStyles';

const Tab = createBottomTabNavigator();



const HomeNavigation = () => (
  <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [{"display": root.name == "Home" ? 'none' : 'flex',}, null],


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
          <Tab.Screen name="Shop" component={Preferences} />
          <Tab.Screen name="Basket" component={Preferences} />
          <Tab.Screen name="Account" component={Preferences} />
      </Tab.Navigator>
 
);

export default HomeNavigation