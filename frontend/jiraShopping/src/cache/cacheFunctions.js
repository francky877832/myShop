import Cache from 'react-native-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeCache = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      //console.log(value)
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
     console.log(error)
    }
  };

  export const getCache = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem('OFFERS_NOTIFICATIONS');
      console.log("jsonValue")
      //console.log(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log(error)
    }
  };