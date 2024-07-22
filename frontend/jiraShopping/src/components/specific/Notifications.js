import React, { useState, useEffect, createContext, useContext, useRef,  } from 'react';
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
import { sendNotificaitons, getNotifications } from '../../utils/commonAppNetworkFunctions'
import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';

const initialLayout = { width: Dimensions.get('window').width };



const RenderNotificationItem = (props) =>{
    const {item} = props
    const openNotif = () => {

    }
    return(
        <View style={[notificationsStyles.item, item.read ? notificationsStyles.itemRead : false]}>
            <Pressable onPress={()=>{openNotif()}} style={[notificationsStyles.pressable,{}]}>
                <View style={[notificationsStyles.icon,{}]}>
                  <Icon type='material-icon' name='ring-volume' size={30} color={appColors.red} />
                </View>
                
                <View style={[notificationsStyles.content,{}]}>
                  <Text style={[customText.text, notificationsStyles.text, {}]}>{item.message}</Text>
                </View>
            </Pressable>
                  <View style={[notificationsStyles.sinceDate, {}]}>
                    <Text style={[customText.text, notificationsStyles.textDate, {}]}>{sinceDate(item.updatedAt).join(' ')}</Text>
                  </View>
        </View>
    )
}



const AllNotifications = () => {

  const { user } = createContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [notificaitons, setNotifications] = useState([])

const sendNotif = async (username, source, model, type) => {
    const response = await sendNotificaitons({username:username, source:source, model:model, type:type})
    if(response)
    {
        Alert.alert('Notif','Notification Ajoutée avec succes.')
    }
    else
    {
      Alert.alert('Notif','Verifier votre connexion Internet.')
    }
}

const getNotif = async (username) => {
  try{
    const response = await getNotifications(username)
    //console.log(response)
    setNotifications(response)
  }catch(error){
    console.log(error)
  }
}

useEffect(() => {
  const fetchData = async () => {  
      //console.log("isLoading")
      await getNotif("Francky877832")
      setIsLoading(false)
    };
    
    if (isLoading) {
      fetchData()
  }
  
  
}, [isLoading]);

    return(
        <View style={[notificationsStyles.sceneContainers]}>
            <FlatList
                    data={notificaitons}
                    renderItem={ ({item}) => { return(<RenderNotificationItem item={item} />)} }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
            />

            <Pressable onPress={async()=>{sendNotif('Francky877832', 'app', 'USER', 'ON_REGISTERED')}} style={{backgroundColor:appColors.secondaryColor1,color:appColors.white,alignItems:"center",paddingVertical:20,}}>
              <Text style={{color:appColors.white,}}>Send Notifications</Text>
            </Pressable>
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
      { key: 'offers', title: 'Offres' },
      { key: 'orders', title: 'Commandes' },
    ]);
  
    const renderScene = SceneMap({
        all: AllNotifications,
      offers: Offers,
      orders: Orders,
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

  