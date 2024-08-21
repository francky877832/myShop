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
import { sendNotificaitons, getNotifications, updateNotificationsRead, getProductFromNotifications } from '../../utils/commonAppNetworkFunctions'
import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const initialLayout = { width: Dimensions.get('window').width };



const RenderNotificationItem = (props) =>{
    const {item, openNotif, user} = props
    const [date, setDate] = useState(sinceDate(item.updatedAt).join(' '))
    const timeoutRef = useRef(null);


useEffect(()=>{
  if(['seconde','secondes', 'minute', 'minutes'].includes(sinceDate(item.updatedAt)[1]))
  { 
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setInterval(() => {
        setDate(sinceDate(item.updatedAt).join(' '))
      }, 60000);
  }
},[])

    return(
        <View style={[notificationsStyles.item, item.read ? notificationsStyles.itemRead : false]}>
            <Pressable onPress={()=>{openNotif(user.username, item)}} style={[notificationsStyles.pressable,{}]}>
                <View style={[notificationsStyles.icon,{}]}>
                  <Icon type='material-icon' name='ring-volume' size={30} color={appColors.red} />
                </View>
                
                <View style={[notificationsStyles.content,{}]}>
                  <Text style={[customText.text, notificationsStyles.text, {}]}>{item.message}</Text>
                </View>
            </Pressable>
                  <View style={[notificationsStyles.sinceDate, {}]}>
                    <Text style={[customText.text, notificationsStyles.textDate, {}]}>{date}</Text>
                  </View>
        </View>
    )
}






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

const getNotif = useCallback(async (username, page, limit) => {
  if (isLoading || !hasMore) return;

  setIsLoading(true);
  try {

    const newData = await getNotifications(username, page, limit);
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
    const response = await updateNotificationsRead({user:user._id, id:item._id})
    //console.log(item)
    if(item.type.toLowerCase() == 'products')
    {
      const data = await getProductFromNotifications(item.datas)
      //console.log("data")
      //console.log(data)
      //{comments:comments,product:product,inputFocused:true}
      navigation.navigate(item.action, {productDetails:data,pass:true})
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
                    renderItem={ ({item}) => { return(<RenderNotificationItem item={item} openNotif={openNotif} user={user} />)} }
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
  


  const Offers = () => {
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
  

const Notifications = (props) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'all', title: 'Toutes' },
     
    ]);
  
  /*
    { key: 'offers', title: 'Offres' },
    { key: 'orders', title: 'Commandes' },

     offers: Offers,
    orders: Orders,
  */
    const renderScene = SceneMap({
      all: AllNotifications
    });
  
   
    const renderTabBar = (props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor:appColors.secondaryColor1 }} // Changez cette couleur pour la barre d'onglets
          labelStyle={{ color: 'white' }} // Changez cette couleur pour le texte des onglets
        />
      );

    return (
        <TabView navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={initialLayout} renderTabBar={renderTabBar}
        />
      );
}

export default  Notifications

  