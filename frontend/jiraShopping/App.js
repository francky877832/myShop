import React, {useEffect} from 'react';
import { Platform } from 'react-native';
import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MainNavigation from './src/navigation/MainNavigation';

import { createNotificationChannel } from './src/utils/utilsFunctions';
import * as Notifications from 'expo-notifications';

export default function App() {


useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
}, []);
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="#333333" barStyle="light-content" />
          <MainNavigation  />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
