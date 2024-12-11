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
  Pressable,
} from "react-native";
import { Input, Icon } from "react-native-elements";

import { appColors, customText, appFont } from "../../styles/commonStyles";
import BadgeIcon from "../common/BadgeIcon";

import { formatMoney } from "../../utils/commonAppFonctions";
import { offersDatas } from "../../utils/offersDatas";
import { accountStyles } from "../../styles/accountStyles";
import { topStyles } from "../../styles/topStyles";
import badgeIconStyles from "../../styles/badgeIconStyles";

const loggedUser = "Francky";
const AboutUs = (props) => {
  return (
    <View>
      <Text>Ok</Text>
    </View>
  );
};
export default AboutUs;

const AboutUsStyles = StyleSheet.create({
  container: {},
});
