import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MainNavigation from './src/navigation/MainNavigation';

export default function App() {


  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="#333333" barStyle="light-content" />
          <MainNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
