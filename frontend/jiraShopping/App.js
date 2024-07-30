import { StrictMode } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import {SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

//<MainNavigation/>
/*

*/
export default function App() {


  return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#333333" barStyle="light-content" />
          <View>
            <Text>Ok</Text>
          </View>
          <MainNavigation/>
        </SafeAreaView>
      </SafeAreaProvider>
      
  );
}
