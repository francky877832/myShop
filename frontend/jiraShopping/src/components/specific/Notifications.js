import React, { useState, useEffect, createContext, useContext, useRef,  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

//custom component


//custom styles
import { notificationsStyles } from '../../styles/notificationsStyles';

//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';

const initialLayout = { width: Dimensions.get('window').width };



const RenderNotificationItem = (props) =>{
    const {item} = props
    return(
        <View style={[notificationsStyles.item,{}]}>
            <Pressable style={[notificationsStyles.pressable,{}]}>
                <Text style={[customText.text, {}]}>{item.username}</Text>
            </Pressable>
        </View>
    )
}



const AllNotifications = () => {
    return(
        <View style={[notificationsStyles.sceneContainers]}>
        <FlatList
                    data={datas}
                    renderItem={ ({item}) => { return(<RenderNotificationItem item={item} />)} }
                    keyExtractor={ (item) => { return item.id_.toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    contentContainerStyle={[notificationsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
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

  