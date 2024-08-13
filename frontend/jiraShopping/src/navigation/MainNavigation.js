import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransitionPresets } from '@react-navigation/stack';

import BadgeIcon from '../components/common/BadgeIcon';
import Search from '../components/specific/Search';
import ProductDetails from '../components/specific/ProductDetails';
import Offers from '../components/specific/Offers';
import AllCommets from '../components/specific/AllCommets';
import Notifications from '../components/specific/Notifications';
import AddProduct from '../components/specific/AddProduct';
import Categories from '../components/common/Categories';
import ProfilShop from '../components/specific/ProfileShop';
import SearchResults from '../components/specific/SearchResults';
import CategoryResults from '../components/specific/CategoryResults';
import UserLogin from '../components/user/UserLogin';
import UserSignup from '../components/user/UserSignup';
import PhoneAuth from '../components/specific/PhoneAuth';
import HeaderNavigation from '../components/common/HeaderNavigation';

import HomeNavigation from '../navigation/HomeNavigation';

//Contexts
import { FilterProvider } from '../context/FilterContext';
import { FavouritesProvider } from '../context/FavouritesContext';
import { ProductItemProvider } from '../context/ProductItemContext';
import { BasketProvider } from '../context/BasketContext';
import { UserProvider } from '../context/UserContext';
import { ProductProvider } from '../context/ProductContext';
import { CommentsProvider } from '../context/CommentsContext';

import { annimatedStackTransition } from './commonNavigationFonctions'

const Stack = createStackNavigator();


export default function MainNavigation() {
  const hide = false

  return ( 
<SafeAreaView style={{ flex: 1 }}>
  
  <NavigationContainer> 
  <UserProvider>
  <ProductProvider>
    <ProductItemProvider>
          <FilterProvider>
            <CommentsProvider>
            <Stack.Navigator
              initialRouteName="UserLogin"
              screenOptions={annimatedStackTransition(0.9, 250, 200)}
      >
                <Stack.Screen name="Preferences" component={HomeNavigation} options={{ title: 'Home', headerShown : false, tabBarVisible: true }} />
                <Stack.Screen name="Search" component={Search}  options={{ title: 'Search', headerShown : false,}} />
                <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{ title: 'Product Details', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="Offers" component={Offers}  options={{ title: 'Propositions', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="AllComments" component={AllCommets}  options={{title: 'Tous Les Commentaires', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Notifications" component={Notifications}  options={{ title: 'Notifications', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="AddProduct" component={AddProduct}  options={{ title: 'Ajouter Un Produit', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Categories" component={Categories}  options={{ title: 'Choisir Une Categorie', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Shop" component={ProfilShop}  options={{ title: 'Choisir Une Categorie', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="SearchResults" component={SearchResults}  options={{ unmountOnBlur: true, title: 'Resultats De Recherche', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="CategoryResults" component={CategoryResults}  options={{ unmountOnBlur: true, title: 'Categories', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="UserLogin" component={UserLogin}  options={{ title: <HeaderNavigation title="Login"/>, headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="UserSignup" component={UserSignup}  options={{ title: <HeaderNavigation title="Sign Up"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="PhoneAuth" component={PhoneAuth}  options={{ title: <HeaderNavigation title="PhoneAuth"/>, headerShown : true, tabBarVisible: false, }} />
              </Stack.Navigator>
            </CommentsProvider>
          </FilterProvider>
      </ProductItemProvider>
      </ProductProvider>
      </UserProvider>
    </NavigationContainer> 
  </SafeAreaView>
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



