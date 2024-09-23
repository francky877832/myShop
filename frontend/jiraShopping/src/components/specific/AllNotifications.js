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
import { sendNotifications, getNotifications, updateNotificationsRead, getProductFromNotifications ,
          getOffers,
        } from '../../utils/commonAppNetworkFunctions'

import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useCache, useCacheBeforeRemove, useCacheWithDatas } from '../../hooks/cacheHooks';
import { getCache, storeCache } from '../../cache/cacheFunctions';


import RenderNotificationItem from '../common/RenderNotificationItem';
import EmptyList from '../common/EmptyList';
import { NotificationsSkeleton } from '../common/CommonSimpleComponents'
import { OrdersContext } from '../../context/OrdersContext';

const initialLayout = { width: Dimensions.get('window').width };




const AllNotifications = () => {

  const { user } = useContext(UserContext)
  const { setUnreadNotifications } = useContext(OrdersContext)

  /*
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1);
  const limit = 50
  const [hasMore, setHasMore] = useState(true);

  const isCacheLoaded = useRef(false)
  */

  const [notifications, setNotifications] = useState([])
  const navigation = useNavigation()

  //GESTION DE LA CACHE ET DU SIDE EFFECT SIMULTANNEMENT
  useCacheBeforeRemove(navigation, storeCache, ['ALL_NOTIFICATIONS', notifications])
  const { datas, loadMore, loading, hasMore } = useCacheWithDatas('ALL_NOTIFICATIONS', getCache, getNotifications, [user] ) 


const sendNotif = async (username, source, model, type) => {
    //setIsLoading(true)
    const response = await sendNotifications({username:username, source:source, model:model, type:type})
    if(response)
    {
        Alert.alert('Notif','Notification Ajoutée avec succes.')
    }
    else
    {
      Alert.alert('Notif','Verifier votre connexion Internet.')
    }
    //setIsLoading(false)
}

/*const updateNotif = async (username, id) => {
  const response = await updateNotificationsRead({username:username, id:id})
  if(response)
  {
      Alert.alert('UpdateNotif','Notification lu avec succes.')
  }
  else
  {
    Alert.alert('UpdateNotif','Verifier votre connexion Internet.')
  }
}*/
/*
const getNotif = useCallback(async (user, page, limit,) => {
  if (isLoading || !hasMore) return;

  setIsLoading(true);
  try {

    const newData = await getNotifications(user, page, limit);
    if (newData.length > 0) {

      isCacheLoaded.current ? setNotifications(newData) : setNotifications((prevNotif)=>[...prevNotif, ...newData])
      setPage((prevPage) => prevPage + 1);
      isCacheLoaded.current = false

    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  } finally {
    setIsLoading(false);
  }
}, [isLoading, hasMore, page]) //[isLoading, hasMore, page]);
*/

const onEndReached = useCallback(async () => { 
  if (hasMore) {
    loadMore(); 
  }
}, [loadMore, hasMore])

/*
useEffect(() => {
  const fetchData = async () => {  
      //console.log("isLoading")
      await getNotif(user, page, limit)
    };
    
      fetchData();
  
}, []);
*/


const openNotif = async (user, item) => {
  try
  {

      switch(item.model.toLowerCase())
      {
        case 'products' :
          //const data = await getProductFromNotifications(item.datas)
          //console.log("data")
          //console.log(data)
          //{comments:comments,product:product,inputFocused:true}
          //item.action = 'productDetails
          navigation.navigate('ProductDetails', {productDetails:item.dataDetails,})
          break;
        case 'comments':
          //navigation.navigate("AllComments",{comments:item.dataDetails.comments,product:item.dataDetails,inputFocused:true, pass:true})
          //I can also use  {productDetails:item.dataDetails,pass:true} but...
          navigation.navigate('ProductDetails',{reshapedComments:item.dataDetails.comments,productDetails:item.dataDetails,inputFocused:true, pass:true})
          break;
        default : break;
      }

      if(item.read==0)
      {
          setUnreadNotifications(prev => prev-1)
          await updateNotificationsRead({user:user._id, id:item._id})
      }
   
  }
  catch(error)
  {
    Alert.alert('Erreur', 'Verifier votre connexion internet.')
    console.log(error)
  }
}


  useEffect(()=>{
      setNotifications(datas)
      //console.log(loading)
  }, [datas, loading])
//console.log(loading)

    if(notifications?.length <= 0 && !loading)
    {
        const message= "Pas de notifications disponibles pour l'instant."
        return(
            <View style={[{flex:1,paddingBottom:100,backgroundColor:appColors.white}]}>
                <EmptyList iconType='font-awesome-5' iconName="box-open" iconSize={100} iconColor={appColors.secondaryColor1} text={message} />
            </View>
        )
    }
    else if(notifications?.length <= 0 && loading)
    {
      return <NotificationsSkeleton number={5} />
    }

   
    return(
        <View style={[notificationsStyles.sceneContainers]}>
            <FlatList
                    data={notifications}
                    renderItem={ ({item}) => { return(<RenderNotificationItem from="notifications" item={item} openNotif={openNotif} user={user} />)} }
                    keyExtractor={ (item) => { return Math.random().toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{onEndReached()}}
                    onEndReachedThreshold={0.3}
                   
            />

            
        </View>
  )
}
  
/*
 ListFooterComponent={{
                      <Pressable onPress={async()=>{sendNotif(user.username, 'app', 'USER', 'ON_REGISTERED')}} style={{backgroundColor:appColors.secondaryColor1,color:appColors.white,alignItems:"center",paddingVertical:20,}}>
                        <Text style={{color:appColors.white,}}>Send Notifications</Text>
                      </Pressable>
                    }}
  */



export default  AllNotifications

  