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


import RenderNotificationItem from '../common/RenderNotificationItem';





const Orders = (props) => {
    const { user } = useContext(UserContext)
    //const user = {_id : "668fdfc6077f2a5c361dd7fc",}
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const limit = 50
    const [hasMore, setHasMore] = useState(true);
    const [offers, setOffers] = useState([])
    const navigation = useNavigation()


  const getOff = useCallback(async (user, page, limit) => {
    if (isLoading || !hasMore) return;
  
    setIsLoading(true);
    try {
  
      const newData = await getOffers(user, page, limit);
      if (newData.length > 0) {
        setOffers((prevOffers)=>[...prevOffers, ...newData])
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
  
  
  const onEndReached = async () => { await getOff(user, page, limit) }

  
const openOffer = async (user, item) => {
    try
    {
        if(item.read==0)
        {
            await updateOfferRead(item)
        }
            
        navigation.navigate("Offers", {product:item.product, offers:item})
    }
    catch(error)
    {
      Alert.alert('openOffer', 'Verifier votre connexion internet.')
      console.log(error)
    }
}

  
  useEffect(() => {
    const fetchData = async () => {  
        //console.log("isLoading")
        await getOff(user, page, limit)
      };
      
       // fetchData();
    
  }, []);



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


export default Orders