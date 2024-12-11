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
  ActivityIndicator,
} from "react-native";

//custom component
import Product from "./Product";
import MiniCategories from "./CategoriesMini";
import { CustomActivityIndicator } from "../common/CommonSimpleComponents";
import { ProductRenderSkeleton } from "./FlatListCommonComponent";
//custom styles
import { productsListStyles } from "../../styles/productsListStyles";
import { numProduct } from "../../styles/productStyles";
import EmptyList from "./EmptyList";
//Contexte
import { FavouritesContext } from "../../context/FavouritesContext";
import { ProductContext } from "../../context/ProductContext";

import { server } from "../../remote/server";
import { appColors } from "../../styles/commonStyles";

const ProductsList = React.forwardRef((props, ref) => {
  const {
    datas,
    horizontal,
    styles,
    onEndReached,
    onScroll,
    name,
    isLoading,
    replace,
    hasMore,
    onEndReachedThreshold,
    minified,
    updateProfileLike,
    origin,
    emptyIcon,
    bottomIcon,
  } = props;
  const [firstLoading, setFirstLoading] = useState(true);
  //console.log(datas[0].product)

  useEffect(() => {
    //console.log(datas)
    /*if(isLoading)
        {
            setFirstLoading(false)
        }*/
  }, []);
  /*if(datas.length <= 0)
    {
        return(
            <ProductRenderSkeleton isLoading={isLoading} width={300} height={300} marginBottom={20} />
        )
    }*/
  const data = datas;

  return (
    <View
      style={[
        productsListStyles.container,
        horizontal ? productsListStyles.containerHorizontal : false,
        styles.productContainer,
      ]}
    >
      <View>
        <MiniCategories />
      </View>
      <FlatList
        data={data}
        nestedScrollEnabled={true}
        renderItem={({ item }) => {
          return (
            <Product
              bottomIcon={bottomIcon}
              origin={origin}
              updateProfileLike={updateProfileLike}
              minified={minified}
              name={name}
              item={item}
              replace={replace}
              styles={productsListStyles.listItem}
              horizontal={horizontal}
            />
          );
        }}
        keyExtractor={(item) => {
          return Math.random().toString();
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
          { flexGrow: 1 },
        ]}
        ref={ref}
        //style={{backgroundColor:'red'}}
        //datas.length <= 0 && !isLoading
        onEndReached={() => {
          typeof onEndReached == "function" && !horizontal
            ? onEndReached()
            : function () {};
        }}
        onEndReachedThreshold={onEndReachedThreshold || 0.5}
        onScroll={(e) => {
          typeof onScroll == "function" && !horizontal
            ? onScroll(e)
            : function (e) {};
        }}
        scrollEventThrottle={16}
        ListHeaderComponent={() => {
          if (data.length <= 0 && isLoading)
            return (
              <ProductRenderSkeleton
                isLoading={isLoading}
                width={300}
                height={300}
                marginBottom={20}
              />
            );
          else if (data.length <= 0 && !isLoading)
            return (
              <EmptyList
                iconType={emptyIcon?.type}
                iconName={emptyIcon?.name}
                iconSize={emptyIcon?.size}
                iconColor={emptyIcon?.color}
                text={emptyIcon?.message}
              />
            );
        }}
        //ListEmptyComponent={<EmptyLit iconType={emptyIcon.type} iconName={emptyIcon.name} iconSize={emptyIcon.size} iconColor={emptyIcon.color} text={emptyIcon.message} />}
        ListFooterComponent={
          isLoading &&
          data.length > 0 && (
            <ActivityIndicator size="large" color={appColors.secondaryColor1} />
          )
        }
      />
    </View>
  );
});

export default React.memo(ProductsList);
