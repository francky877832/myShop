import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useCallback,
} from "react";
import { View, Text, Animated, StyleSheet, TextInput } from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import { Input } from "react-native-elements";

import {
  appColors,
  customText,
  screenHeight,
} from "../../../styles/commonStyles";
import { addProductStyles } from "../../../styles/addProductStyles";
import { sCategoriesStyles } from "../../../styles/paths/search/sCategoriesStyles";
import {
  CustomButton,
  CustomActivityIndicator,
} from "../../common/CommonSimpleComponents";

import { Icon, CheckBox } from "react-native-elements";

import { FilterContext } from "../../../context/FilterContext";
import { ProductItemContext } from "../../../context/ProductItemContext";
import { capitalizeFirstLetter } from "../../../utils/commonAppFonctions";
import { screenWidth } from "../../../styles/commonStyles";
import { formatMoney } from "../../../utils/commonAppFonctions";

const SPrices = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category, subCategories } = route.params;
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const {
    minPriceFromContext,
    maxPriceFromContext,
    setMinPriceFromContext,
    setMaxPriceFromContext,
    setFiltersUpdated,
  } = useContext(FilterContext);

  const [isMinPriceFocused, setIsMinPriceFocused] = useState(false);
  const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: "Interval De Prix" });
  });

  const applyAllUserChoices = () => {
    setMinPriceFromContext(minPrice);
    setMaxPriceFromContext(maxPrice);
    //setFiltersUpdated(true)
    navigation.goBack();
  };

  return (
    <View style={[sCategoriesStyles.priceContainer]}>
      <View style={{ height: 10 }}></View>

      <View style={[sCategoriesStyles.price, {}]}>
        <View style={[sCategoriesStyles.pricesContainer]}>
          <TextInput
            placeholder="Prix minimal en XAF"
            placeholderTextColor={appColors.secondaryColor5}
            inputMode="numeric"
            style={[
              sCategoriesStyles.priceInput,
              isMinPriceFocused && sCategoriesStyles.priceInputFocused,
            ]}
            onFocus={() => setIsMinPriceFocused(true)}
            onBlur={() => setIsMinPriceFocused(false)}
            value={minPrice}
            onChangeText={(price) => setMinPrice(formatMoney(price, "XAF"))}
          />
        </View>

        <View
          style={[
            sCategoriesStyles.pricesContainer,
            { borderTopWidth: 1, borderColor: appColors.lightWhite },
          ]}
        >
          <TextInput
            placeholder="Prix maximal en XAF"
            placeholderTextColor={appColors.secondaryColor5}
            inputMode="numeric"
            style={[
              sCategoriesStyles.priceInput,
              isMaxPriceFocused && sCategoriesStyles.priceInputFocused,
            ]}
            onFocus={() => setIsMaxPriceFocused(true)}
            onBlur={() => setIsMaxPriceFocused(false)}
            value={maxPrice}
            onChangeText={(price) => setMaxPrice(formatMoney(price, "XAF"))}
          />
        </View>
      </View>

      <View style={{ height: 20 }}></View>
      <View style={[sCategoriesStyles.bottomButtonContainer]}>
        <CustomButton
          text="Appliquer"
          color={appColors.white}
          backgroundColor={appColors.secondaryColor1}
          styles={{ pressable: sCategoriesStyles.pressable }}
          onPress={() => {
            applyAllUserChoices();
          }}
        />
      </View>
    </View>
  );
};
export default SPrices;
