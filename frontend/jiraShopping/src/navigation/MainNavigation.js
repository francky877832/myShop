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
import Followers from '../components/specific/Followers';
import Orders from '../components/specific/Orders';
import OrdersDetails from '../components/specific/OrdersDetails';
import FiltersSearch from '../components/specific/FiltersSearch';
import ChooseSearchFilters from '../components/common/ChooseSearchFilters';
import SSubCategories from '../components/paths/search/SSubCategories';
import VerifyDeliveryInfos from '../components/specific/VerifyDeliveryInfos';
import Address from '../components/specific/Address';
import ConfirmDeliveryInfos from '../components/specific/ConfirmDeliveryInfos';
import ValidatePayment from '../components/specific/ValidatePayment';
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
import { OrdersProvider } from '../context/OrdersContext';

import { annimatedStackTransition } from './commonNavigationFonctions'

const Stack = createStackNavigator();


export default function MainNavigation() {
  const hide = false

  return ( 
<SafeAreaView style={{ flex: 1 }}>
 <UserProvider>
  <FilterProvider>
  <NavigationContainer> 
 
  <ProductProvider>
    <ProductItemProvider>
          
            <OrdersProvider>
            <CommentsProvider>
            <Stack.Navigator
              initialRouteName="ValidatePayment"
              screenOptions={annimatedStackTransition(0.9, 250, 200)}
            >
                <Stack.Screen name="Preferences" component={HomeNavigation} options={{ title: 'Home', headerShown : false, tabBarVisible: true }} />
                <Stack.Screen name="Search" component={Search}  options={{ title: 'Search', headerShown : false,}} />
                <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{ title: 'Product Details', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="Followers" component={Followers}  options={{ title: 'Account Informations', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Offers" component={Offers}  options={{ title: 'Propositions', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Orders" component={Orders}  options={{ title: 'Commandes', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="OrdersDetails" component={OrdersDetails}  options={{ title: 'Details De Commandes', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="AllComments" component={AllCommets}  options={{title: 'Tous Les Commentaires', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Notifications" component={Notifications}  options={{ title: 'Notifications', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="AddProduct" component={AddProduct}  options={{ title: 'Ajouter Un Produit', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Categories" component={Categories}  options={{ title: 'Choisir Une Categorie', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Shop" component={ProfilShop}  options={{ title: 'Choisir Une Categorie', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="SearchResults" component={SearchResults}  options={{ unmountOnBlur: true, title: 'Resultats De Recherche', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="CategoryResults" component={CategoryResults}  options={{ unmountOnBlur: true, title: 'Categories', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="FiltersSearch" component={FiltersSearch}  options={{ unmountOnBlur: true, title: 'Filtres', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="ChooseSearchFilters" component={ChooseSearchFilters}  options={{ unmountOnBlur: true, title: 'Categories', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="SSubCategories" component={SSubCategories}  options={{ unmountOnBlur: true, title: 'Sous-Categories', headerShown : true, tabBarVisible: false, }} />
                
                <Stack.Screen name="VerifyDeliveryInfos" component={VerifyDeliveryInfos}  options={{ unmountOnBlur: true, title: 'Informations De Payement', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="VerifyDeliveryInfosAddress" component={Address} options={{ title: 'Mon Adresse', headerShown : true, tabBarVisible: true }} />
                <Stack.Screen name="ConfirmDeliveryInfos" component={ConfirmDeliveryInfos} options={{ title: 'Confirmer Les Informations', headerShown : true, tabBarVisible: true }} />
                <Stack.Screen name="ValidatePayment" component={ValidatePayment} options={{ title: 'Valider Le Payement', headerShown : true, tabBarVisible: true }} />

                
                <Stack.Screen name="UserLogin" component={UserLogin}  options={{ title: <HeaderNavigation title="Login"/>, headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="UserSignup" component={UserSignup}  options={{ title: <HeaderNavigation title="Sign Up"/>, headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="PhoneAuth" component={PhoneAuth}  options={{ title: <HeaderNavigation title="PhoneAuth"/>, headerShown : true, tabBarVisible: false, }} />
              </Stack.Navigator>
            </CommentsProvider>
            </OrdersProvider>
          
      </ProductItemProvider>
      </ProductProvider>
      
    </NavigationContainer> 
    </FilterProvider>
    </UserProvider>
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



