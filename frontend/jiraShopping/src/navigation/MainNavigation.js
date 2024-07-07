import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';


import BadgeIcon from '../components/common/BadgeIcon';
import Search from '../components/specific/Search';
import ProductDetails from '../components/specific/ProductDetails';
import Offers from '../components/specific/Offers';
import AllCommets from '../components/specific/AllCommets';
import Notifications from '../components/specific/Notifications';
import AddProduct from '../components/specific/AddProduct';
import Categories from '../components/common/Categories';
import HomeNavigation from '../navigation/HomeNavigation';

//Contexts
import { FilterProvider } from '../context/FilterContext';
import { FavouritesProvider } from '../context/FavouritesContext';
import { ProductItemProvider } from '../context/ProductItemContext';
import { BasketProvider } from '../context/BasketContext';

const Stack = createStackNavigator();


export default function MainNavigation() {
  const hide = false

  return ( 
<SafeAreaView style={{ flex: 1 }}>
<FavouritesProvider>
  <BasketProvider>
  <NavigationContainer> 
    <ProductItemProvider>
        
          <FilterProvider>
              <Stack.Navigator initialRouteName="Preferences">
                <Stack.Screen name="Preferences" component={HomeNavigation} options={{ title: 'Home', headerShown : false, tabBarVisible: true }} />
                <Stack.Screen name="Search" component={Search}  options={{ title: 'Search', headerShown : false, }} />
                <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{ title: 'Product Details', headerShown : false, tabBarVisible: false, }} />
                <Stack.Screen name="Offers" component={Offers}  options={{ title: 'Propositions', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="AllComments" component={AllCommets}  options={{ title: 'All Comments', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Notifications" component={Notifications}  options={{ title: 'Notifications', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="AddProduct" component={AddProduct}  options={{ title: 'Ajouter Un Produit', headerShown : true, tabBarVisible: false, }} />
                <Stack.Screen name="Categories" component={Categories}  options={{ title: 'Choisir Une Categorie', headerShown : true, tabBarVisible: false, }} />
              </Stack.Navigator>
          </FilterProvider>
      </ProductItemProvider>
    </NavigationContainer>
    </BasketProvider>
            </FavouritesProvider>

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



