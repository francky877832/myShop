import { StrictMode } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import {SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

//<MainNavigation/>
/*
          <View>
            <Text>Ok</Text>
          </View>
*/
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
