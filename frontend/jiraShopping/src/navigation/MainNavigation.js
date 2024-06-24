import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import BadgeIcon from '../components/common/BadgeIcon';
import Preferences from '../components/specific/Preferences';
import HomeNavigation from '../navigation/HomeNavigation';


const Tab = createBottomTabNavigator();


export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown : false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [{"display": "flex"}, null],

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
            return <BadgeIcon name={iconName} size={size} color={color} badgeCount={badgeCount} />;
          },
        })}
        
      >
        <Tab.Screen name="Home" component={HomeNavigation} />
        <Tab.Screen name="Favourites" component={HomeNavigation} />
        <Tab.Screen name="Shop" component={HomeNavigation} />
        <Tab.Screen name="Basket" component={HomeNavigation} />
        <Tab.Screen name="Account" component={HomeNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
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
