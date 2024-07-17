import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Alert, Dimensions, ActivityIndicator} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const initialLayout = { width: Dimensions.get('window').width };
import { useFocusEffect } from '@react-navigation/native';

//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';
import Categories from '../common/Categories';
//custom styles
import { preferencesStyles } from '../../styles/preferencesStyles';
import SearchResults from './SearchResults';
import { screenHeight, screenWidth } from '../../styles/commonStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';


import { server } from '../../remote/server';
import { Button } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { ProductItemContext } from '../../context/ProductItemContext';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import {CustomActivityIndicator} from '../common/CommonSimpleComponents'

const Preferences = (props) => {
    const navigation = useNavigation()
    const [isSearch, setIsSearch] = useState(false) 
    const [products, setProducts]  = useState([])
    const [isLoading, setIsLoading]  = useState(true)


    const {user, loginUserWithEmailAndPassword, isAuthenticated, setIsAuthenticated } = useContext(UserContext)

    const getProducts = async ()=> {
        try
        {
            const response = await fetch(`${server}/api/datas/products/get`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                     'Authorization': `Bearer ${user.token}`, //Vue protege
                },});
                const responseJson = await response.json();
                setProducts(responseJson)
        } catch (error) {
        console.error(error);
      }
    }

useEffect(()=>{
    //loginUserWithEmailAndPassword("francky877832@gmail.com", "francky877832", "0000000")
}, [])

useEffect( () => {
    const fetchData = async () => {
        //setIsLoading(true);
        await getProducts()
        setIsLoading(false);
      };
  
    if (isAuthenticated && isLoading) {
        fetchData()
    }
    
  }, [isLoading, navigation]); //refreshComponent, isAuthenticated,

//console.log(user)


const ProductsListWithFilters_ = () => {
    return (
        <View style={{flex:1,}}>
            <ProductsListWithFilters name="Preference" filters={false} datas={products} horizontal={false} styles={preferencesStyles} title="...Choisis Pour Vous" />
            {isLoading && 
                <CustomActivityIndicator styles={{}} /> 
            }
        </View>
    )
}
const Categories_ = () => {
    return (
            <Categories page="category" goBackTo="SearchResults" route={{}} />
    )
}


const [index, setIndex] = useState(0);

const [routes] = useState([
    { key: 'products', title: 'Préférences' },
    { key: 'categories', title: 'Categories' },
]);

const renderScene = SceneMap({
    products: ProductsListWithFilters_,
    categories: Categories_,

});


const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor : (index === 0 || index==1 ? appColors.secondaryColor1 : false), }}
      style={{ backgroundColor:appColors.white, borderColor:appColors.white, }} // Changez cette couleur pour la barre d'onglets
      //labelStyle={{ color: appColors.secondaryColor1 }} // Changez cette couleur pour le texte des onglets
      renderLabel={({ route, focused, color }) => {
        return (
            <Text style={{ color: focused ? appColors.secondaryColor1 : appColors.gray, fontWeight: focused ? 'bold' : 'normal' }}>
                {route.title}
            </Text>
        )
      }}
      onIndexChange={(index) => {
        setIndex(index);
      }}
    />
  );

    return(
        <View style={preferencesStyles.container}>
                    <View style={preferencesStyles.top}>
                        <Top />
                    </View>
            <View style={[{flex:1,}]}>
                { isSearch ?
                        <ProductsListWithFilters name="Preference" filters={true} datas={products} horizontal={false} styles={preferencesStyles} title="Resultats de recherche" />
                    :
                    
                    <View style={{flex:1}}>
                        <TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout} renderTabBar={renderTabBar}/>
                    </View>
                }

        </View>
    </View>
    )


}

export default  Preferences