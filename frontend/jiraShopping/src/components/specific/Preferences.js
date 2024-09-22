import { API_BACKEND } from '@env';
import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Alert, Dimensions, ActivityIndicator} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const initialLayout = { width: Dimensions.get('window').width };
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

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
import { appColors, customText } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';


import { server } from '../../remote/server';
import { Button } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import { ProductContext } from '../../context/ProductContext'
import { useNavigation } from '@react-navigation/native';
import { ProductItemContext } from '../../context/ProductItemContext';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import {CustomActivityIndicator, TemporaryNotification} from '../common/CommonSimpleComponents'

import { useSelector, useDispatch } from 'react-redux';
import { fetchUserFavourites } from '../../store/favourites/favouritesSlice'; 
import { fetchUserBasket } from '../../store/baskets/basketsSlice';
import { debouncer } from '../../utils/commonAppFonctions';
import { OrdersContext } from '../../context/OrdersContext';
import { LeftToRightViewBox, RightToLeftViewBox } from '../common/AnimatedComponents';

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"


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
    const isFocused = useIsFocused()
    const [isSearch, setIsSearch] = useState(false) 
    //const [isLoading, setIsLoading]  = useState(true)
    const dispatch = useDispatch();
    const Fav_page = useSelector((state) => state.favourites.page);
    const { favourites, liked } = useSelector(state => state.favourites);
    const timeoutRef = useRef(null);
    //console.log(page)



    const {user, loginUserWithEmailAndPassword, isAuthenticated, setIsAuthenticated } = useContext(UserContext)
    const { getProducts , loadMoreData, products, isLoading, hasMore, page, setIsLoading, refreshKey} = useContext(ProductContext)
    const {getOrders, page:order_page} = useContext(OrdersContext)

    const [initialLoad, setInitialLoad] = useState(true); // Variable pour empêcher le premier appel
    
    const emptyMessage="Pas de produits a afficher pour le moment. Nous vous preparons pour une mise a jour spectaculaire."
    const emptyIcon = {type:"font-awesome-5", name:"box-open", size:100, color:appColors.secondaryColor1, message:emptyMessage}

    const loadMoreData_ = useCallback(async () => {
      /*console.log("initLoad")
      console.log(initialLoad)
      console.log("initLoad")*/

        console.log("ONEDNREACH")
        await loadMoreData({user:user, resetPage:false})
      
    }) // [isLoading, hasMore, page])


    
    useEffect(() => {
      //console.log(loggedUserId)

      const fetchData = async () => {  
        await getOrders(user, order_page)
      } ;
      

      if (isAuthenticated){
        dispatch(fetchUserFavourites({user:user._id, page:Fav_page})); //reset:true
        dispatch(fetchUserBasket(user._id));
      
        fetchData();
        console.log("PREFERENCE BASKET AND FAVOURITES")
      }
    

  }, []);
  

/*
useEffect( () => {
    //console.log("****************")
    const fetchData = async () => {
        await loadMoreData({user:user, resetPage:true, isInitial:true})
        //console.log("OK")
        //setIsLoading(false);
      };
  // if (isAuthenticated && isLoading) {


      if (isAuthenticated &&  isFocused) {
      fetchData()
      console.log("PREFERENCE PRODUCT")
  }

    
  }, [isFocused])

  */
  useEffect( () => {
    //console.log("****************")
    const fetchData = async () => {
        await loadMoreData({user:user, resetPage:true, isInitial:true})
      };


    if (isAuthenticated) {
      fetchData()
      console.log("PREFERENCE PRODUCT")
    }

    
  }, [])

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
                <ProductsListWithFilters emptyIcon={emptyIcon} name="Preference" onEndReached={loadMoreData_} onEndReachedThreshold={0.1} isLoading={isLoading} hasMore={hasMore} filters={false} datas={products} horizontal={false} styles={preferencesStyles} title={false} />
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


  const [show1, setShow1] = useState(true)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)


  const animationSet = {  }
  const animationIndex = useRef(0)
  const intervalRef = useRef(null);

  useEffect(() => {
    animationSet['show1'] = setShow1
    animationSet['show2'] = setShow2
    animationSet['show3'] = setShow3
  }, [])

  const animationToDisplay = () =>{
    //console.log('item', item)
    animationSet[Object.keys(animationSet)[animationIndex.current]](false)

    animationIndex.current = (animationIndex.current+1)%Object.keys(animationSet).length
    
    animationSet[Object.keys(animationSet)[animationIndex.current]](true)
  }

  useEffect(()=>{
    intervalRef.current = setInterval(() => {
      animationToDisplay()
    }, 4000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [])

  //CENTER LE BOX EN FONCTION DE LA TAILLE DU TEXTE
  const [text1Width, setText1Width] = useState(0);
  const [text2Width, setText2Width] = useState(0);
  const [text3Width, setText3Width] = useState(0);

  // Définir la coordonnée X où vous souhaitez centrer le texte
  const x = screenWidth/2

  const onText1Layout = (event) => {
    const { width } = event.nativeEvent.layout;
    setText1Width(width);
  };

  const onText2Layout = (event) => {
    const { width } = event.nativeEvent.layout;
    setText2Width(width);
  };
  const onText3Layout = (event) => {
    const { width } = event.nativeEvent.layout;
    setText3Width(width);
  };

    return(
        <View style={preferencesStyles.container}>
              <View style={preferencesStyles.top}>
                  <Top />
              </View>

            <View style={[preferencesStyles.topAnimationBox, {backgroundColor:show3?appColors.secondaryColor1:preferencesStyles.topAnimationBox.backgroundColor}]}>
              
              
              { show1 &&
                <LeftToRightViewBox show={show1} duration={1000}  from={-screenWidth} to={(screenWidth-text1Width)/2} styles={{position : 'absolute',}}>
                  <View onLayout={onText1Layout} style={[preferencesStyles.topAnimation]}>
                      <Text style={[customText.text, preferencesStyles.animatedText, {}]}>Achats facile + négociation de prix...</Text>
                  </View>
              </LeftToRightViewBox>
              }

              { show2 &&
              <RightToLeftViewBox show={show2} duration={1000} from={screenWidth} to={(screenWidth-text2Width)/2} styles={{position : 'absolute',}}>
                <View onLayout={onText2Layout} style={[preferencesStyles.topAnimation]}>
                    <Text style={[customText.text, preferencesStyles.animatedText, {}]}>Payment sécurisé et en un clic!</Text>
                </View>
              </RightToLeftViewBox>
              }

              <LeftToRightViewBox show={show3} duration={1000} from={-screenWidth} to={screenWidth/2} styles={{position : 'absolute',}}>
                <View onLayout={onText3Layout} style={[preferencesStyles.winkelBox]}>
                    <Text style={[customText.text, preferencesStyles.winkelText, {}]}>Winkel</Text>
                </View>
              </LeftToRightViewBox>
                

            </View>  

          

            <View style={[{flex:1,}]}>
                    <View style={{flex:1}}>
                        <TabView  
                        lazy renderLazyPlaceholder={() => <View><Text>Loading...</Text></View>} navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout} renderTabBar={renderTabBar} />
                    </View>
  

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
  