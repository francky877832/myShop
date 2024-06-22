import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import BadgeIcon from './src/components/common/BadgeIcon';
import Preferences from './src/components/specific/Preferences';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const Screen1 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 1</Text>
  </View>
);

const Screen2 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 2</Text>
  </View>
);

const Screen3 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Stack Screen 1</Text>
  </View>
);
const Screen4 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Stack Screen 2</Text>
  </View>
);


const HomeStackScreen = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Screen3} options={{ title: 'Overview', headerShown : false, }} />
    <Stack.Screen name="Screen4" component={Screen4}  options={{ title: 'Overview', headerShown : false, }} />
  </Stack.Navigator>
);

export default function App() {
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
        <Tab.Screen name="Home" component={Preferences} />
        <Tab.Screen name="Favourites" component={Screen2} />
        <Tab.Screen name="Shop" component={HomeStackScreen} />
        <Tab.Screen name="Basket" component={HomeStackScreen} />
        <Tab.Screen name="Account" component={HomeStackScreen} />
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
