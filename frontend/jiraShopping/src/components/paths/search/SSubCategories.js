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
  Animated,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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

const SSubCategories = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category, subCategories } = route.params;
  const {
    selectedCategories,
    updateCategories,
    setSelectedCategories,
    resetAllFilters,
    updateModalCategories,
    selectedModalCategoriesFromContext,
    setSelectedModalCategoriesFromContext,
    allCategoriesSelected,
    setAllCategoriesSelected,
  } = useContext(FilterContext);
  //const [selectedCategories, setSelectedCategories] = useState({"Vetements": true, "name": "Vetements"})
  const catPath = subCategories.map((el) => category + "/" + el.name);
  //console.log(catPath)
  const [all, setAll] = useState(
    !catPath.some((el) => !!selectedModalCategoriesFromContext[el] == false)
  );

  const timeoutRef = useRef(null);

  const [selectedLocalModalCategories, setSelectedLocalModalCategories] =
    useState(selectedModalCategoriesFromContext);

  const updateLocalModalCategories = useCallback((id) => {
    console.log("selectedLocalModalCategories");

    setSelectedLocalModalCategories((prevSlectedCategories) => {
      const selectedCat = {
        ...prevSlectedCategories,
        [id]: !prevSlectedCategories[id],
      };

      all && !!prevSlectedCategories[id] ? setAll(false) : null;
      !all && !catPath.some((el) => !!selectedCat[el] == false)
        ? setAll(true)
        : null;

      return selectedCat;
    });
  });

  const applyAllUserChoices = () => {
    setSelectedModalCategoriesFromContext((prev) => {
      return { ...prev, ...selectedLocalModalCategories };
    });
    allCategoriesSelected ? setAllCategoriesSelected(false) : null;
    navigation.goBack();
  };

  const handleUserChoice = async (cat, subCat) => {
    /* Je met a jour le local et le contexte */
    updateLocalModalCategories(cat + "/" + subCat);
    //updateModalCategories(cat+"/"+subCat)
  };
  const getAllSubCategories = () => {
    setAll((prev) => !prev);

    let allSubCat = {};
    subCategories.forEach((el) => {
      allSubCat = { ...allSubCat, [`${category}/${el.name}`]: !all };
    });
    setSelectedLocalModalCategories(allSubCat);
  };

  const toggleCheckBox = () => {};

  return (
    <View style={[subCategoriesItemStyles.container]}>
      <Pressable style={[subCategoriesItemStyles.itemContainer]}>
        <CheckBox
          title="Tout Sélectionner"
          containerStyle={[
            subCategoriesItemStyles.contentContainer,
            subCategoriesItemStyles.contentContainerTop,
          ]}
          textStyle={[
            customText.text,
            subCategoriesItemStyles.checkBoxText,
            {
              color: appColors.secondaryColor1,
              fontWeight: "bold",
              fontSize: 16,
            },
          ]}
          checked={all}
          onPress={() => {
            getAllSubCategories();
          }}
        />
      </Pressable>

      <View style={[{ top: 5 }]}>
        <FlatList
          data={subCategories}
          nestedScrollEnabled={true}
          renderItem={({ item }) => {
            return (
              <Pressable style={[subCategoriesItemStyles.itemContainer]}>
                <CheckBox
                  title={capitalizeFirstLetter(item.name)}
                  containerStyle={[subCategoriesItemStyles.contentContainer]}
                  textStyle={[
                    customText.text,
                    subCategoriesItemStyles.checkBoxText,
                  ]}
                  checked={
                    Object.keys(selectedLocalModalCategories).length > 0
                      ? selectedLocalModalCategories[category + "/" + item.name]
                      : selectedModalCategoriesFromContext[
                          category + "/" + item.name
                        ]
                  }
                  onPress={() => {
                    handleUserChoice(category, item.name);
                  }}
                />
              </Pressable>
            );
          }}
          keyExtractor={(item) => {
            return item._id.toString();
          }}
          horizontal={false}
          numColumns={1}
          ItemSeparatorComponent={(item) => {
            return <View style={{ width: 5 }}></View>;
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[sCategoriesStyles.flatlist]}
          scrollEventThrottle={16}
        />
      </View>

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

export default SSubCategories;

const subCategoriesItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.lightWhite,
    top: 2,
    paddingBottom: 95,
  },
  checkBox: {
    width: screenWidth / 2.5,
    paddingLeft: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: appColors.lightWhite,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: appColors.white,
    //height : 100,
  },
  contentContainer: {
    borderWidth: 0,
    //margin:1,
    padding: 0,
    backgroundColor: appColors.white,
  },

  checkBoxText: {
    marginLeft: 20,
    color: appColors.secondaryColor5,
    fontWeight: "normal",
  },
});
