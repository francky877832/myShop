import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransitionPresets } from '@react-navigation/stack';

import Account from '../components/specific/Account';
import AccountSettings from '../components/specific/AccountSettings';
import PasswordChange from '../components/specific/PasswordChange';
import Address from '../components/specific/Address';
import AboutUs from '../components/specific/AboutUs';
import HeaderNavigation from '../components/common/HeaderNavigation';
const Stack = createStackNavigator();

export default function AccountNavigation() {

  return ( 
        <Stack.Navigator initialRouteName="AccountHome">
            <Stack.Screen name="AccountHome" component={Account} options={{ title: 'Account', headerShown : false, tabBarVisible: true }} />
            <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ title: 'Parametre Du Compte', headerShown : true, tabBarVisible: true }} />
            <Stack.Screen name="PasswordChange" component={PasswordChange} options={{ title: 'Changer De Mot De Passe', headerShown : true, tabBarVisible: true }} />
            <Stack.Screen name="Address" component={Address} options={{ title: 'Mon Adresse', headerShown : true, tabBarVisible: true }} />
            <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: 'A Propos De Nous', headerShown : true, tabBarVisible: true }} />
        </Stack.Navigator>
  )
}
