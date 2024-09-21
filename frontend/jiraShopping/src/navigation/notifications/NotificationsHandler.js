import React, { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { CustomModalActivityIndicator } from '../../components/common/CommonSimpleComponents'
import { appColors } from '../../styles/commonStyles';

const NotificationsHandler = () => {
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();

  const [isNotifLoading, setIsNotifLoading] = useState(false)

  useEffect(() => {
    // Écoute les notifications reçues
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      //console.log('Notification reçue:', notification);
    });

    // Écoute les réponses aux notifications
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification reçue:', response.notification.request.content);
      const {component, nestedComponent, datas} = response.notification.request.content.data
      //navigation.navigate(screen, { productId: data.productId });
        if(component === "Preferences")
        {
            navigation.navigate(component, {screen : nestedComponent, params:datas });  
        }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <CustomModalActivityIndicator onRequestClose={setIsNotifLoading} isLoading={isNotifLoading} size="large" color={appColors.secondaryColor1} message="Commande en cours de preparation..." />

};

export default NotificationsHandler;
