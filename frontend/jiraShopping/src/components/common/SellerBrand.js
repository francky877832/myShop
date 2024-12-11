import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Icon } from "react-native-elements";

import BadgeIcon from "./BadgeIcon";
import badgeIconStyles from "../../styles/badgeIconStyles";
import { profilShopStyles } from "../../styles/profilShopStyles";

import { appColors, customText, screenWidth } from "../../styles/commonStyles";
import { sinceDate } from "../../utils/commonAppFonctions";
import { useRoute } from "@react-navigation/native";
import { OrdersContext } from "../../context/OrdersContext";

const SellerBrand = (props) => {
  const {
    pub,
    onlineDate,
    certified,
    pp,
    username,
    navigation,
    route,
    closeNotif,
  } = props;
  const { unreadNotifications } = useContext(OrdersContext);

  const profile = pp || require("../../assets/images/product.png");
  return (
    <View style={[sellerBrandStyles.sellerBrand]}>
      <View style={[sellerBrandStyles.left]}>
        <View style={[sellerBrandStyles.sellerBrandImageContainer]}>
          <Image
            source={profile}
            style={[sellerBrandStyles.sellerBrandImage]}
          />
        </View>

        <View style={[sellerBrandStyles.sellerBrandName]}>
          <View
            style={[
              { flexDirection: "column", justifyContent: "space-between" },
            ]}
          >
            <Text
              numberOfLines={2}
              style={[customText.text, { fontWeight: "bold" }]}
            >
              @{username}
            </Text>
            {pub && (
              <View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "flex-end",
                    left: 20,
                    top: -3,
                  },
                ]}
              >
                <Icon
                  name="ellipse"
                  type="ionicon"
                  size={10}
                  color={appColors.green}
                  styles={{}}
                />
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    numberOfLines={2}
                    style={[
                      customText.text,
                      {
                        color: appColors.secondaryColor5,
                        fontSize: 11,
                        left: 5,
                      },
                    ]}
                  >
                    En ligne il y'a{" "}
                    {sinceDate(onlineDate)[0] + " " + sinceDate(onlineDate)[1]}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                width: "100%" /*backgroundColor:"red",*/,
              },
            ]}
          >
            <Text
              style={[customText.text, { color: appColors.secondaryColor1 }]}
            >
              {certified ? "Vendeur certifié" : "Membre"}
            </Text>
            <BadgeIcon
              name="checkmark-circle"
              size={18}
              color={appColors.secondaryColor1}
              badgeCount={0}
              styles={badgeIconStyles}
            />
          </View>
        </View>
      </View>
      {!closeNotif && (
        <View
          style={[profilShopStyles.notifParameter, { alignSelf: "flex-end" }]}
        >
          {route.params == undefined && (
            <Pressable
              style={[profilShopStyles.notification]}
              onPress={() => {
                navigation.navigate("Account", {
                  screen: "AccountSettings",
                  params: {},
                });
              }}
            >
              <BadgeIcon
                name="create-outline"
                size={24}
                color="black"
                badgeCount={0}
                styles={badgeIconStyles}
              />
            </Pressable>
          )}

          <Pressable
            style={[profilShopStyles.notification]}
            onPress={() => {
              navigation.navigate("Notifications");
            }}
          >
            <BadgeIcon
              name="notifications"
              size={24}
              color="black"
              badgeCount={unreadNotifications}
              styles={badgeIconStyles}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const sellerBrandStyles = StyleSheet.create({
  sellerBrand: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth - 10 - 40,
    left: 10,
    paddingRight: 15,

    //paddingHorizontal : 50,
    //backgroundColor : 'red',
  },
  sellerBrandImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sellerBrandImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: appColors.secondaryColor1,
  },
  sellerBrandName: {
    height: 50,
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingLeft: 7,
  },
  left: {
    flexDirection: "row",
  },
});

export default SellerBrand;
