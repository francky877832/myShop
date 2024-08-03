import { API_BACKEND } from '@env';
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
import { ProductContext } from '../../context/ProductContext'
import { useNavigation } from '@react-navigation/native';
import { ProductItemContext } from '../../context/ProductItemContext';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import {CustomActivityIndicator} from '../common/CommonSimpleComponents'


const ProductsListWithFilters_ = React.memo(({onEndReached, isLoading, hasMore, products}) => {
    useEffect(()=>{
        console.log("ok")
        console.log(products)
    })
    return (
       
    <View style={{flex:1,}}>
        {products?.length > 0 ?
            <ProductsListWithFilters name="Preference" onEndReached={onEndReached} isLoading={isLoading} hasMore={hasMore} filters={false} datas={products} horizontal={false} styles={preferencesStyles} title={false} />
           
        :null
        }
         {/*isLoading && 
                <CustomActivityIndicator styles={{}} /> 
                */
            }
    </View>
       
    )
})
const Categories_ = React.memo(() => {
    return (
            <Categories page="category" goBackTo="SearchResults" route={{}} />
    )
})


const FirstRoute = React.memo(() => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
  ));
  
  const SecondRoute = React.memo(() => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  ));


const Preferences = (props) => {
    const navigation = useNavigation()
    const [isSearch, setIsSearch] = useState(false) 
    //const [isLoading, setIsLoading]  = useState(true)


    const {user, loginUserWithEmailAndPassword, isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    const { getProducts , loadMoreData, products, isLoading, hasMore, setIsLoading, refreshKey} = useContext(ProductContext)

useEffect(()=>{
    //loginUserWithEmailAndPassword("francky877832@gmail.com", "francky877832", "0000000")
}, [])

useEffect( () => {
    console.log("****************")
    const fetchData = async () => {
        await loadMoreData()
        //console.log("OK")
        //setIsLoading(false);
      };
  // if (isAuthenticated && isLoading) {
    if (isAuthenticated) {
        fetchData()
    }
    console.log("CLOSE***")
    
  }, []); //refreshComponent, isAuthenticated,

//console.log(user)

useEffect(()=>{
    //console.log("RE-RENDER**")
    //console.log(products)
})

const [index, setIndex] = useState(0);

const [routes] = useState([
    { key: 'products', title: 'Préférences' },
    { key: 'categories', title: 'Categories' },
]);


/*
const renderScene = (SceneMap({
    products: FirstRoute,
    categories: SecondRoute,
  }))
*/
const renderScene = ({ route }) => {
    switch (route.key) {
        case 'products':
          //return <ProductsListWithFilters_ onEndReached={loadMoreData} isLoading={isLoading} hasMore={hasMore} data={products} />;
          return (
            <View style={{flex:1,}}>
                <ProductsListWithFilters name="Preference" onEndReached={loadMoreData} onEndReachedThreshold={0.3} isLoading={isLoading} hasMore={hasMore} filters={false} datas={products} horizontal={false} styles={preferencesStyles} title={false} />
        </View>
          )
        case 'categories':
          return <Categories_ />;
        default:
          return null;
      }
};



const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor : (index === 0 || index==1 ? appColors.secondaryColor1 : false), }}
      style={{ backgroundColor:appColors.white, borderColor:appColors.white, }} // Changez cette couleur pour la barre d'onglets
      //labelStyle={{ color: appColors.secondaryColor1 }} // Changez cette couleur pour le texte des onglets
      renderLabel={({ route, focused, color }) => {
        return (
            <Text style={{ fontSize : 16, color: focused ? appColors.secondaryColor1 : appColors.gray, fontWeight: focused ? 'bold' : 'normal' }}>
                {route.title}
            </Text>
        )
      }}
      onIndexChange={(index) => {
        setIndex(index);
      }}
    />
  )

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
                        <TabView  
                        //key={refreshKey} 
                        lazy renderLazyPlaceholder={() => <View><Text>Loading...</Text></View>} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout} renderTabBar={renderTabBar} />
                    </View>
                }

        </View>
    </View>
    )


}

export default  React.memo(Preferences)

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
    },
    scene: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  