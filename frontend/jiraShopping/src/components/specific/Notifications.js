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
import { useNavigation, useRoute } from '@react-navigation/native';


import OffersNotifications from './OffersNotifications';
import AllNotifications from './AllNotifications';

const initialLayout = { width: Dimensions.get('window').width };


 
const Notifications = (props) => {
  const route = useRoute()
    const {key} = route.params
    const [index, setIndex] = useState(key?key:0);
    const [routes] = useState([
      { key: 'all', title: 'Toutes' },
      { key: 'offers', title: 'Offres' }
     
    ]);
  
  /*
    { key: 'offers', title: 'Offres' },
    { key: 'orders', title: 'Commandes' },

     offers: Offers,
    orders: Orders,
  */
    const renderScene = SceneMap({
      all: AllNotifications,
      offers : OffersNotifications
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

  