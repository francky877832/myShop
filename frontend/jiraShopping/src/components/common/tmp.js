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

//custom component
import Product from "./Product";
//custom styles
import { productsListStyles } from "../../styles/productsListStyles";
import { numProduct } from "../../styles/productStyles";
import Filters from "./Filters";

const ProductsList = (props) => {
  const { datas, horizontal, styles } = props;
  const [selectedCategories, setSelectCategories] = useState({});
  const [selectedOrderBy, setSelectedOrderBy] = useState("");

  const [isNewFocused, setIsNewFocused] = useState(true);
  const [isOldFocused, setIsOldFocused] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const searchBarRef = useRef(null);
  const scrollViewRef = useRef(null);
  //const datas = []

  const _handlePress = (id) => {
    setSelectCategories((prevSlectedCategories) => {
      console.log(prevSlectedCategories);
      return {
        ...prevSlectedCategories,
        [id]: !prevSlectedCategories[id],
      };
    });
  };

  const updateCategories = (id) => {
    setSelectCategories((prevSlectedCategories) => {
      console.log(prevSlectedCategories);

      return {
        ...prevSlectedCategories,
        [id]: !prevSlectedCategories[id],
      };
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Filters
        prices={[minPrice, setMinPrice, maxPrice, setMaxPrice]}
        orderBy={[selectedOrderBy, setSelectedOrderBy]}
        category={[selectedCategories, _handlePress]}
        isNewFocused={isNewFocused}
        isOldFocused={isOldFocused}
        setIsNewFocused={setIsNewFocused}
        setIsOldFocused={setIsOldFocused}
        suggestion={true}
      />
      <View
        style={[
          productsListStyles.container,
          horizontal ? productsListStyles.containerHorizontal : false,
          styles.productContainer,
        ]}
      >
        <FlatList
          data={datas}
          renderItem={({ item }) => {
            return (
              <Product
                item={item}
                styles={productsListStyles.listItem}
                horizontal={horizontal}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id_.toString();
          }}
          horizontal={horizontal}
          numColumns={horizontal ? 1 : numProduct}
          ItemSeparatorComponent={(item) => {
            return <View style={{ width: 5 }}></View>;
          }}
          showsHorizontalScrollIndicator={horizontal}
          contentContainerStyle={[
            productsListStyles.flatlist,
            horizontal ? productsListStyles.flatlistHorizontal : false,
            styles.flatlist,
          ]}
        />
      </View>
    </View>
  );
};

export default ProductsList;
