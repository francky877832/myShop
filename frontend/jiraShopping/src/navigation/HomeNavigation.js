import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


import BadgeIcon from '../components/common/BadgeIcon';
import Preferences from '../components/specific/Preferences';
import Favourites from '../components/specific/Favourites';
import ProfilShop from '../components/specific/ProfileShop';
import Basket from '../components/specific/Basket';
import Account from '../components/specific/Account';
import AccountNavigation from './AccountNavigation';


import badgeIconStyles from '../styles/badgeIconStyles';
import { appColors } from '../styles/commonStyles';

//Contexte
import { screenHeight } from '../styles/commonStyles';

const Tab = createBottomTabNavigator();


const Test = ()=>{
  return (<View><Text>Ok</Text></View>)
}
const HomeNavigation = () => {
  return (
    <Tab.Navigator initialRouteName='Home' 
        screenOptions={({ route }) => ({
          // tabBarStyle: {
            // backgroundColor: 'white', // Couleur de fond de la tab bar
            // borderTopColor: '#e0e0e0', // Couleur de la bordure supérieure
            // borderTopWidth: 1,
            // backgroundColor: 'beige',
            // borderTopLeftRadius: 15,
               
            // height: 40, // Hauteur de la tab bar
            // overflow: 'hidden', // Pour s'assurer que les bords arrondis sont visibles
            // display : "flex"
          // },
          // tabBarActiveTintColor: '#e91e63', // Couleur des icônes actives
          // tabBarInactiveTintColor: '#gray', // Couleur des icônes inactives
          lazy : true,
          headerShown : false,
          tabBarActiveTintColor: appColors.secondaryColor1,
          tabBarInactiveTintColor: appColors.secondaryColor5,
          tabBarStyle: [{"display": route.name == "Home" ? 'flex' : 'flex',
            borderRadius: 100,
            overflow: 'hidden',
            backgroundColor:"beige",
            // padding:,
            bottom : 5,
            width:"90%",
            height:50,
            // justifyContent:'space-around',
            // alignItems:'center',
            alignSelf: 'center', // Centre cet élément spécifiquement
          }, null],
          tabBarIcon: ({ focused, color, size }) => {
            size=25
            let iconName;
            let badgeCount = 0;
            //let focused = false
            if (route.name === 'Home') {
              iconName = focused ? "home" : "home";
              badgeCount = 0;
            } else if (route.name === 'Favourites') {
              iconName = focused ? 'heart' : 'heart';
              badgeCount = 0;
            } else if (route.name === 'MyShop') {
              iconName = focused ? 'bag-handle' : 'bag-handle';
              badgeCount = 0;
            } else if (route.name === 'Basket') {
              iconName = focused ? 'basket' : 'basket';
              badgeCount = 0;
            } else if (route.name === 'Account') {
              iconName = focused ? 'person-circle' : 'person-circle';
              badgeCount = 0;
            }
            return <BadgeIcon focused={focused} name={iconName} bottomTab={true} size={size} color={color} badgeCount={badgeCount} styles={badgeIconStyles} />
          },
        })}
        
      >
            <Tab.Screen name="Home" component={Preferences}  />
            <Tab.Screen name="Favourites" component={Favourites} />
            <Tab.Screen name="MyShop" component={ProfilShop} />
            <Tab.Screen name="Basket" component={Basket} options={{ title: 'Mon Panier', headerShown : true, tabBarVisible: false, }} />
            <Tab.Screen name="Account" component={AccountNavigation} />
        </Tab.Navigator>


)}
export default HomeNavigation