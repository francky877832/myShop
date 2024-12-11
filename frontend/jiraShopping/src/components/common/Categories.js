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
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Input } from "react-native-elements";

import { appColors, customText, screenHeight } from "../../styles/commonStyles";
import { categoriesStyles } from "../../styles/categoriesStyles";
import { addProductStyles } from "../../styles/addProductStyles";
import {
  CustomButton,
  CustomActivityIndicator,
  CustomModalActivityIndicator,
} from "./CommonSimpleComponents";

import { Icon } from "react-native-elements";

import { formatMoney } from "../../utils/commonAppFonctions";
import { ProductItemContext } from "../../context/ProductItemContext";
import { FilterContext } from "../../context/FilterContext";

import { server } from "../../remote/server";
import { colors } from "../../utils/sampleDatas";
import { capitalizeFirstLetter } from "../../utils/commonAppFonctions";
import FiltersSearch from "../specific/FiltersSearch";
import { ProductRenderSkeleton } from "../common/FlatListCommonComponent";

const Categories = (props) => {
  const { params } = props.route;
  const { page } = props;
  const goBackTo = params?.datas?.goBackTo || props?.goBackTo;
  const goBackOptions = ["AddProduct", "FiltersSearch"];
  //console.log(page)
  const {
    setSelectedBrand,
    selectedColor,
    setSelectedColor,
    categories,
    brands,
    isLoading,
    setIsLoading,
  } = useContext(ProductItemContext);
  const {
    selectedCategories,
    updateCategories,
    setSelectedCategories,
    resetAllFilters,
    searchCategory,
  } = useContext(FilterContext);
  //const [selectedCategories, setSelectedCategories] = useState({"Vetements": true, "name": "Vetements"})

  const navigation = useNavigation();
  const [selectedCategories_, setSelectedCategories_] = useState({
    Vetements: true,
    name: "Vetements",
  });

  const updateCategories_ = useCallback((id, path) => {
    setSelectedCategories_((prevSelectedCategory) => {
      //console.log("path")
      //console.log(path)
      if (path == undefined) {
        //console.log(id)
        if (prevSelectedCategory["name"] == id)
          return { [id]: prevSelectedCategory[id], name: id };
        return { [id]: !prevSelectedCategory[id], name: id };
      } else if (path == "complete_category") {
        return { [id]: true, name: id };
      } else {
        return { [id]: true, name: id, subCategories: path };
      }
    });
  });

  /*const updateCategories = useCallback((id, path) => {
        setSelectedCategories((prevSelectedCategory) => {
            if(path==undefined)
            {        //console.log(id)
                if(prevSelectedCategory["name"] == id)
                    return {[id] : prevSelectedCategory[id], name:id,}
                return {[id] : !prevSelectedCategory[id], name:id,}
                
            }
            else if(path=="complete_category")
            {
                return {[id] : true, name:id,}
            }
            else
            { //console.log(path)
                return {[id] : true, name:id, subCategories:path}
            }
        })
    })*/
  //console.log(selectedCategories)
  //Appel side effect pour recuperer les cat, marque et couleur de la BD
  /* let categorie = [
        {
            _id : 1,
            no : 0,
            name : "Vetements",
            icon : "ionicon/shirt-outline",
            subCategories : ["Hommes", "Femmes", "Mixte", "Autres"],
        },
        {
            _id : 2,
            no : 1,
            name : "Electronique",
            icon : "ionicon/phone-portrait-outline",
            subCategories : ["Telephone", "Ordinateur", "Tablette", "Autres"],
        },
    ]
    let brand = [{_id:1, name:"Tecno"}, {_id:2, name:"Samsung"},]*/

  /*useFocusEffect(
    useCallback(()=>{
        updateCategories("Vetements")
    }, [updateCategories])
)*/

  const Category = React.memo((props) => {
    const { item, selectedCategories_, updateCategories_ } = props;

    //console.log(item.subCategories)
    //console.log(selectedCategories)
    /*useEffect(()=>{
            updateselectedCategories("Vetements")
        }, [])*/
    //console.log(selectedCategories)
    return (
      <View style={{ flex: 1 }}>
        <View style={[categoriesStyles.categoryContainer, { flex: 1 }]}>
          <Pressable
            style={[
              categoriesStyles.pressableCat,
              selectedCategories_[item.name]
                ? { backgroundColor: appColors.lightOrange }
                : false,
            ]}
            onPress={() => {
              updateCategories_(item.name);
            }}
          >
            <Icon
              name={item.icon.split("/")[1]}
              type={item.icon.split("/")[0]}
              color={
                selectedCategories_[item.name]
                  ? appColors.secondaryColor1
                  : appColors.black
              }
            />
            <Text
              style={[
                categoriesStyles.text,
                selectedCategories_[item.name]
                  ? { color: appColors.secondaryColor1, fontWeight: "bold" }
                  : false,
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        </View>
        {/*
                        selectedCategories[item.name] &&
                    
                        <View pointerEvents='auto' style={[categoriesStyles.subCategoryContainer, {position:"relative",top:-(item.no-1)*100,left:100,}]}>
                            {
                                item.subCategories.map((cat, index) => {
                                    return (
                                            <Pressable key={cat._id} style={[categoriesStyles.pressableSubCat,{height:100}]} onPress={()=>{updateselectedCategories(item.name, cat.name); navigation.goBack();}}>
                                                <Text>{cat.name}</Text>
                                            </Pressable>
                                    )
                                })
                            }
                        </View>
                        */}
      </View>
    );
  });

  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [reloadTo, setReloadTo] = useState(false);

  const handleScroll = (event) => {
    //Alert.alert("a")
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    const isAtTop = contentOffset.y <= 20;
    if (isAtBottom) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
    //console.log(isAtBottom)
    //setIsAtTop(isAtTop);
  };

  useEffect(() => {
    //console.log("OK")
    if (reloadTo)
      navigation.navigate("CategoryResults", {
        searchText: "",
        display: "category",
      });
  }, [reloadTo]);

  const getCategory = async (type, cat, subCat) => {
    await searchCategory(selectedCategories_); //important pour orderBy(val)
    //mais ici cest selectedCategories_ passe en parametre
    //de navigate() qui sera utilisé puisque les setters sont asynchrones
    //console.log(selectedCategories)

    switch (type) {
      case "category":
        updateCategories(selectedCategories_.name, "complete_category");
        if (!goBackOptions.includes(goBackTo)) {
          navigation.navigate("CategoryResults", {
            category: selectedCategories_,
            searchText: "",
            display: "category",
          });
        } else {
          navigation.goBack();
        }
        break;
      case "subCategory":
        updateCategories(cat, subCat);
        //{[id] : true, name:id, subCategories:path}
        if (!goBackOptions.includes(goBackTo)) {
          navigation.navigate("CategoryResults", {
            category: { [cat]: true, name: cat, subCategories: subCat },
            searchText: "",
            display: "category",
          });
        } else {
          navigation.goBack();
        }
        break;
      default:
        break;
    }

    //navigation.navigate("CategoryResults", {category:selectedCategories_, searchText:"", display:"category"});
  };
  //route.params.handleCategory()
  return (
    <View style={[categoriesStyles.container]}>
      {(page == "category" || params?.datas?.page === "category") && (
        <View style={{ flexDirection: "row" }}>
          <View style={[categoriesStyles.categoriesContainer]}>
            <FlatList
              data={categories}
              nestedScrollEnabled={true}
              renderItem={({ item }) => {
                return (
                  <Category
                    item={item}
                    selectedCategories_={selectedCategories_}
                    updateCategories_={updateCategories_}
                  />
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
              contentContainerStyle={[categoriesStyles.flatlist]}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              ListHeaderComponent={() => {
                /*
                                if(categories.length <= 0)
                                {
                                    return <ProductRenderSkeleton isLoading={isLoading} width={300} height={300} marginBottom={20} /> 
                                }*/
              }}
            />
            <View style={[styles.scrollIndicator]}>
              <Icon
                name={isAtBottom ? "chevron-up" : "chevron-down"}
                type="ionicon"
                size={30}
                color={appColors.secondaryColor4}
              />
            </View>
          </View>
          <View style={[categoriesStyles.subCategoryContainer, { flex: 1 }]}>
            <FlatList
              data={categories}
              nestedScrollEnabled={true}
              renderItem={({ item }) => {
                return (
                  <View>
                    {selectedCategories_[item.name] &&
                      item.subCategories.map((subCat, index) => {
                        return (
                          <View key={subCat._id}>
                            <Pressable
                              style={[
                                categoriesStyles.pressableSubCat,
                                { height: 100 },
                              ]}
                              onPress={() => {
                                getCategory(
                                  "subCategory",
                                  item.name,
                                  subCat.name
                                );
                              }}
                            >
                              <Text style={[categoriesStyles.subCatText]}>
                                {subCat.name}
                              </Text>
                            </Pressable>
                          </View>
                        );
                      })}
                  </View>
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
              contentContainerStyle={[categoriesStyles.flatlist, { flex: 1 }]}
              ListFooterComponent={(item) => {
                if (!goBackOptions.includes(goBackTo)) {
                  return (
                    <View style={{ height: 50, top: 10, alignSelf: "center" }}>
                      <Text>
                        {/* searchText:`***${selectedCategories.name}/${selectedCategories.subCategories}***` */}
                      </Text>
                      <Pressable
                        onPress={() => {
                          getCategory("category");
                        }}
                        style={[categoriesStyles.fullCat]}
                      >
                        <Text
                          style={[
                            categoriesStyles.text,
                            {
                              color: appColors.white,
                              textDecorationLine: "none",
                              fontSize: 16,
                            },
                          ]}
                        >
                          Afficher La Categorie {">>"}{" "}
                        </Text>
                      </Pressable>
                    </View>
                  );
                }
              }}
              ListHeaderComponent={() => {
                /* if(categories.length <= 0)
                    {
                        return <ProductRenderSkeleton isLoading={isLoading} width={300} height={300} marginBottom={20} /> 
                    }*/
              }}
            />
          </View>
        </View>
      )}

      {params?.datas?.page == "brand" && (
        <View style={[categoriesStyles.brandContainer]}>
          <FlatList
            data={brands}
            nestedScrollEnabled={true}
            renderItem={({ item }) => {
              return (
                <View style={{ flex: 1 }}>
                  <Pressable
                    style={[categoriesStyles.pressableSubCat]}
                    onPress={() => {
                      setSelectedBrand(item.name);
                      navigation.goBack();
                    }}
                  >
                    <Text style={[categoriesStyles.text]}>{item.name}</Text>
                  </Pressable>
                </View>
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
            contentContainerStyle={[categoriesStyles.flatlist]}
          />
        </View>
      )}

      {params?.datas?.page == "color" && (
        <View style={[categoriesStyles.colorContainer, {}]}>
          <FlatList
            data={colors}
            nestedScrollEnabled={true}
            renderItem={({ item }) => {
              if (item.name != "multicolor") {
                return (
                  <View style={{}}>
                    <Pressable
                      style={[categoriesStyles.pressableColor]}
                      onPress={() => {
                        setSelectedColor(item.name);
                        navigation.goBack();
                      }}
                    >
                      <View
                        style={[
                          {
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: item.name,
                          },
                        ]}
                      ></View>
                      <Text style={[addProductStyles.normalText]}>
                        {capitalizeFirstLetter(item.name)}
                      </Text>
                    </Pressable>
                  </View>
                );
              } else {
                return (
                  <View style={{ flex: 1 }}>
                    <Pressable
                      style={{}}
                      onPress={() => {
                        setSelectedColor(item.name);
                        navigation.goBack();
                      }}
                    >
                      <Image
                        source={require("../../assets/images/multicolor.png")}
                        style={[
                          {
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: item.name,
                          },
                        ]}
                      />
                      <Text style={[addProductStyles.normalText]}>
                        {capitalizeFirstLetter(item.name)}
                      </Text>
                    </Pressable>
                  </View>
                );
              }
            }}
            keyExtractor={(item) => {
              return item._id.toString();
            }}
            horizontal={false}
            numColumns={5}
            ItemSeparatorComponent={(item) => {
              return <View style={{ width: 5 }}></View>;
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[{}]}
          />
        </View>
      )}

      <CustomModalActivityIndicator
        onRequestClose={setIsLoading}
        isLoading={isLoading}
        size="large"
        color={appColors.secondaryColor1}
        message="Chargements des données..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollIndicator: {
    zIndex: 100,
    alignItems: "center",
    paddingVertical: 20,
    //borderTopWidth: 1,
    //borderTopColor: appColors.black,
    position: "absolute",
    top: -20,
    //bottom : 0,
    left: 70,
    right: 0,
    //backgroundColor:"red",
  },
});
export default Categories;
