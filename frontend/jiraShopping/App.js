import { StrictMode } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import {SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


export default function App() {


  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#333333" barStyle="light-content" />
          <MainNavigation/>
        </SafeAreaView>
      </SafeAreaProvider>
      
  );
}
