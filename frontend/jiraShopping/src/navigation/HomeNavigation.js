import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


import BadgeIcon from '../components/common/BadgeIcon';
import Preferences from '../components/specific/Preferences';

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


const HomeNavigation = () => (
  <Stack.Navigator initialRouteName="Preferences">
    <Stack.Screen name="Preferences" component={Preferences} options={{ title: 'Overview', headerShown : false, }} />
    <Stack.Screen name="Screen4" component={Screen4}  options={{ title: 'Overview', headerShown : false, }} />
  </Stack.Navigator>
);

export default HomeNavigation