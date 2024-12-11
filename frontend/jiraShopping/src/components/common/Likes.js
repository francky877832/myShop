import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";

const Likes = (props) => {
  return (
    <SafeAreaView>
      <View style={likesStyles.container}></View>
    </SafeAreaView>
  );
};

const likesStyles = StyleSheet.create({
  container: {},
});

export default Likes;
