import React, { useState, useEffect, createContext, useContext, useRef, useCallback  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
//custom component


//custom styles
import { notificationsStyles } from '../../styles/notificationsStyles';

//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';

//
import { getOffers, updateOfferRead } from '../../utils/commonAppNetworkFunctions'

import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useCacheBeforeRemove, useCacheWithDatas } from '../../hooks/cacheHooks';

import RenderNotificationItem from '../common/RenderNotificationItem';
import EmptyList from '../common/EmptyList';

import { storeCache, getCache } from '../../cache/cacheFunctions';
import { NotificationsSkeleton } from '../common/CommonSimpleComponents'
import { OrdersContext } from '../../context/OrdersContext';


const OffersNotifications = (props) => {
  const navigation = useNavigation()
    const { user } = useContext(UserContext)
    const { setUnreadNotifications } = useContext(OrdersContext)

      //GESTION DE LA CACHE ET DU SIDE EFFECT SIMULTANNEMENT
  //(cacheKey, getCache, loadMoreDatas, parameters)


    //useCacheBeforeRemove(navigation, storeCache, ['OFFERS_NOTIFICATIONS', offers])
  const { datas, loadMore, loading, willProccessed, hasMore } = useCacheWithDatas('OFFERS_NOTIFICATIONS', getCache, getOffers, [user] ) 
    
    /*const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const limit = 100
    const [hasMore, setHasMore] = useState(true);*/

    const [offers, setOffers] = useState([])
   // const [isCacheLoaded, setIsCacheLoaded] = useState(false)
   //const isCacheLoaded = useRef(false)

/*
  const getOff = useCallback(async (user) => {
    const result = {}
    if (isLoading || !hasMore) return;
  
    setIsLoading(true);
    try {
  
      const newData = await getOffers(user, page, limit);
      //console.log(newData[0])
      if (newData.length > 0) {

        setPage((prevPage) => prevPage + 1);
        //setIsCacheLoaded(false)
        result = {...result, datas:newData}

      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    } finally {
      setIsLoading(false);
      return {...result,  datas:newData, hasMore, isLoading, user, page, limit}
    }
  },) //[isLoading, hasMore, page]);
  */
  
  const onEndReached = useCallback(async () => { 
    if (hasMore) {
      loadMore(); 
    }
  }, [loadMore, hasMore])

  
const openOffer = async (user, item) => {
    try
    {     
        navigation.navigate("Offers", {product:item.product, notificationUsers:{seller:item.seller, buyer:item.buyer}, notificationsOffers:item.offers})
        if(item.read==0)
        {
            setUnreadNotifications(prev => prev-1)
            await updateOfferRead(item)
        }
        
    }
    catch(error)
    {
      Alert.alert('openOffer', 'Verifier votre connexion internet.')
      console.log(error)
    }
}




  useEffect(()=>{
      setOffers(datas)
      //console.log(datas)
  }, [datas, loading])

    if(offers.length <= 0 && loading)
    {
      return <NotificationsSkeleton number={5} />
    }
    else if(offers.length <= 0 && !loading)
    {
        const message= "Pas de notifications disponibles pour l'instant."
        return(
            <View style={[{flex:1,paddingBottom:100,backgroundColor:appColors.white}]}>
                <EmptyList iconType='font-awesome-5' iconName="box-open" iconSize={100} iconColor={appColors.secondaryColor1} text={message} />
            </View>
        )
    }
    

    const updateItem = (item, updates) => {
      if(Array.isArray(offers))
      {
        
        setOffers(prev => {
            return prev.map(n => {
                if(n._id===item._id)
                {
                  console.log(updates)
                  return {...item, ...updates}
                }
                else
                  return item
            })
        })

      }
    }

    return (
        <View style={[notificationsStyles.sceneContainers]}>
            <FlatList
                    data={offers}
                    renderItem={ ({item}) => { 
                        //console.log(item)
                        return(
                            <RenderNotificationItem from="offers" item={{...item,
                                                    title:user._id===item.seller._id?item.buyer.username:item.seller.username,
                                                    message : "Vous avez reçu une nouvelle offre. Cliquez pour en savoir plus.",
                                                }} 
                                                    
                                            openNotif={openOffer} updateItem={updateItem} user={user} />
                        ) 
                    } }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={() => {}}
            />
        </View>
    )
}





  const Orders = () => {
        return (
        <View style={[notificationsStyles.sceneContainers]}>
        <FlatList
                    data={datas}
                    renderItem={ ({item}) => { return(<RenderNotificationItem item={item} />) } }
                    keyExtractor={ (item) => { return item.id_.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
                        />
        </View>
  );
}

  const Comments = () => {
    return (
        <View style={[notificationsStyles.sceneContainers]}>
        <FlatList
                    data={datas}
                    renderItem={ ({item}) => {  } }
                    keyExtractor={ (item) => { return item.id_.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
                        />
        </View>
  );
}

export default OffersNotifications