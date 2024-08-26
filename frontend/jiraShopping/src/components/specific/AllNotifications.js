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
import { sendNotificaitons, getNotifications, updateNotificationsRead, getProductFromNotifications ,
          getOffers,
        } from '../../utils/commonAppNetworkFunctions'

import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';


import RenderNotificationItem from '../common/RenderNotificationItem';

const initialLayout = { width: Dimensions.get('window').width };




const AllNotifications = () => {

  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1);
  const limit = 50
  const [hasMore, setHasMore] = useState(true);
  const [notificaitons, setNotifications] = useState([])
  const navigation = useNavigation()


const sendNotif = async (username, source, model, type) => {
    setIsLoading(true)
    const response = await sendNotificaitons({username:username, source:source, model:model, type:type})
    if(response)
    {
        Alert.alert('Notif','Notification Ajoutée avec succes.')
    }
    else
    {
      Alert.alert('Notif','Verifier votre connexion Internet.')
    }
    setIsLoading(false)
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

const getNotif = useCallback(async (user, page, limit) => {
  if (isLoading || !hasMore) return;

  setIsLoading(true);
  try {

    const newData = await getNotifications(user, page, limit);
    if (newData.length > 0) {
      setNotifications((prevNotif)=>[...prevNotif, ...newData])
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  } finally {
    setIsLoading(false);
  }
}, [isLoading, hasMore, page]) //[isLoading, hasMore, page]);


const onEndReached = async () => { await getNotif(user, page, limit) }


useEffect(() => {
  const fetchData = async () => {  
      //console.log("isLoading")
      await getNotif(user, page, limit)
    };
    
      fetchData();
  
}, []);



const openNotif = async (user, item) => {
  try
  {

      switch(item.type.toLowerCase())
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
          await updateNotificationsRead({user:user._id, id:item._id})
      }
   
  }
  catch(error)
  {
    Alert.alert('Erreur', 'Verifier votre connexion internet.')
    console.log(error)
  }
}

    return(
        <View style={[notificationsStyles.sceneContainers]}>
            <FlatList
                    data={notificaitons}
                    renderItem={ ({item}) => { return(<RenderNotificationItem from="notifications" item={item} openNotif={openNotif} user={user} />)} }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{onEndReached()}}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={
                      <Pressable onPress={async()=>{sendNotif(user.username, 'app', 'USER', 'ON_REGISTERED')}} style={{backgroundColor:appColors.secondaryColor1,color:appColors.white,alignItems:"center",paddingVertical:20,}}>
                        <Text style={{color:appColors.white,}}>Send Notifications</Text>
                      </Pressable>
                    }
            />

            
        </View>
  )
}
  




export default  AllNotifications

  