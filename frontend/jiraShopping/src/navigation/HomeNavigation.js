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
import Search from '../components/specific/Search';
import ProductDetails from '../components/specific/ProductDetails';

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
  <Stack.Navigator initialRouteName="ProductDetails">
    <Stack.Screen name="Preferences" component={Preferences} options={{ title: 'Preferences', headerShown : false, }} />
    <Stack.Screen name="Search" component={Search}  options={{ title: 'Search', headerShown : false, }} />
    <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{ title: 'Product Details', headerShown : false, }} />
  </Stack.Navigator>
);

export default HomeNavigation