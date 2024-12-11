import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Input, Icon } from "react-native-elements";

import { appColors, customText, appFont } from "../../styles/commonStyles";
import { CustomButton } from "../common/CommonSimpleComponents";

import { referralStyles } from "../../styles/referralStyles";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";

import { referralDatas } from "../../utils/referralDatas";

const loggedUser = "Francky";

const GiftHistoryRenderItem = (props) => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { reward } = props;

  return (
    <Pressable style={[styles.container]}>
      <View style={[styles.reward]}>
        <Icon name="close" type="ionicon" size={24} color={appColors} />
        <Text style={[customText.text, styles.rewardText]}>
          {reward.reward}
        </Text>
      </View>

      <View style={[styles.points]}>
        <Text style={[customText.text, styles.pointsText]}>
          {reward.pointsSpent}
        </Text>
      </View>
    </Pressable>
  );
};
export default GiftHistoryRenderItem;

const styles = StyleSheet.create({
  container: {},
  reward: {},
  points: {},
  pointsText: {},
  rewardText: {},
});
