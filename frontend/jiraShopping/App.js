import { StrictMode } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';


export default function App() {
  return (
    <StrictMode>
      <SafeAreaView style={{flex:1,top:StatusBar.currentHeight,}}>
        <MainNavigation/>
      </SafeAreaView>
    </StrictMode>
  );
}
