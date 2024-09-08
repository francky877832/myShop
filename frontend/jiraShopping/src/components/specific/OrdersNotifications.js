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

import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


import RenderNotificationItem from '../common/RenderNotificationItem';
import { OrdersContext } from '../../context/OrdersContext';





const OrdersNotifications = (props) => {
    const { user } = useContext(UserContext)


    const navigation = useNavigation()

 //[isLoading, hasMore, page]);
  
    const {orders, isLoading, setIsLoading, getOrders, hasMore, page, updateOrderRead, updateOrderStatus, setHasMore, setPage, setOrders, setIsNewDatas } = useContext(OrdersContext)
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




const timeoutRef = useRef(null)
useEffect(() => {

    const fetchData = async () => {  
        await getOrders(user, page)
      };
      
       fetchData();
      
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    // Configurer un nouveau timeout
    timeoutRef.current = setTimeout(() => {
        setHasMore(true)
        setIsLoading(false)
        setPage(1)
        setIsNewDatas(true)
    }, 500);

    
  }, []);

  

  const [read, setRead] = useState(0)
//console.log(orders[1]?.products.read)
//item.products._id.toString()
    return (
        <View style={[notificationsStyles.sceneContainers]}>
            <FlatList
                    data={orders}
                    renderItem={ ({item}) => { return(<RenderNotificationItem from="offers" setRead={setRead}
                            item={{...item,
                                read : item.products.read,
                            title:"Nouvelle Commande",
                            message : user._id===item.products.productDetails.seller._id ?
                                    "Félicitations!! Votre produit vient d'etre acheté. PréCipitez-vous vers l'agence la plus proche afin de l'expedier.\n Cliquez pour plus d\'informations."
                                :
                                    "Félicitations!! Vous venez de passer une nouvelle commande. Nous travaillons pour que vous entrez en possession de votre produit dans les plus bref delais."
                        }} 
                        openNotif={openOrder} user={user} />
                ) } }
                    keyExtractor={ (item) => { return Math.random().toString() /*item.products._id.toString();*/ } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
            />
        </View>
  );
}


export default OrdersNotifications