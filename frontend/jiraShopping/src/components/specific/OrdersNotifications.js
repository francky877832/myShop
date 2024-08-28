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
import { getOrders, updateOrderRead, updateOrderStatus } from '../../utils/commonAppNetworkFunctions'

import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';


import RenderNotificationItem from '../common/RenderNotificationItem';
import { OrdersContext } from '../../context/OrdersContext';





const OrdersNotifications = (props) => {
    const { user } = useContext(UserContext)


    const navigation = useNavigation()

 //[isLoading, hasMore, page]);
  
    const {orders, isLoading, getOrders, hasMore, page} = useContext(OrdersContext)
  const onEndReached = async () => { await getOrders(user, page) }

  
const openOrder = async (user, item) => {
    try
    {
        if(item.products.read===0)
        {
            await updateOrderRead(item._id, item.products.product)
        }
            
        navigation.navigate("Orders", {order:item})
    }
    catch(error)
    {
      Alert.alert('OpenOrder', 'Verifier votre connexion internet.')
      console.log(error)
    }
}

useEffect(() => {
    const fetchData = async () => {  
        await getOrders(user, page)
      };
      
       fetchData();
    
  }, []);

  




    return (
        <View style={[notificationsStyles.sceneContainers]}>
            <FlatList
                    data={orders}
                    renderItem={ ({item}) => { return(<RenderNotificationItem from="offers" 
                            item={{...item,
                            title:"Nouvelle Commande",
                            message : user._id===item.products.productDetails.seller._id ?
                                    "Félicitations!! Votre produit vient d'etre acheté. PréCipitez-vous vers l'agence la plus proche afin de l'expedier.\n Cliquez pour plus d\'informations."
                                :
                                    "Félicitations!! Vous venez de passer une nouvelle commande. Nous travaillons pour que vous entrez en possession de votre produit dans les plus bref delais."
                        }} 
                        openNotif={openOrder} user={user} />
                ) } }
                    keyExtractor={ (item) => { return item.products._id.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
            />
        </View>
  );
}


export default OrdersNotifications