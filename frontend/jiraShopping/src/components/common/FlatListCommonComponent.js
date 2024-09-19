import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { productStyles } from '../../styles/productStyles';
import { productsListStyles } from '../../styles/productsListStyles';
import { appColors, screenWidth, screenHeight } from '../../styles/commonStyles';
import { cardWidth, marginVertical, marginHorizontal } from '../../styles/productStyles';
const { width, height } = Dimensions.get("window");
import ContentLoader, { Rect, Circle, Facebook  } from 'react-content-loader/native';
import { card } from '../../styles/filtersStyles';


const ImageLoading = (props) => (
 
  <ContentLoader
  speed={0.5}
  width={cardWidth}
  height={cardWidth*1.2}
  viewBox={`0 0 ${cardWidth} ${cardWidth*1.2}`}
  backgroundColor={appColors.skeletonBackgroundColor} //"#ecebeb"  // Beige clair (arrière-plan)
  foregroundColor={appColors.skeletonForegrundColor} //"#ffe7d5"
  rtl={false}
  //style={{backgroundColor:'red'}}
>
  {/* Image produit */}
  <Rect x="0" y="10" rx="5" ry="5" width={cardWidth} height={cardWidth*1.2} />
  
  {/* Bouton favori (cœur) */}
  <Circle cx="150" cy="30" r="15" />
  </ContentLoader>

)

const BottomLoading = (props) => (
 
  <ContentLoader
  speed={0.5}
  width={cardWidth}
  height={140}
  viewBox={`0 0 ${cardWidth} ${140}`}
  backgroundColor={appColors.skeletonBackgroundColor} //"#ecebeb"  // Beige clair (arrière-plan)
  foregroundColor={appColors.skeletonForegrundColor} //"#ffe7d5"
  rtl={true}
  //style={{backgroundColor:"red"}}
  >
  {/* Titre du produit */}
  <Rect x="0" y="10" rx="5" ry="5" width={cardWidth} height="20" />
  
  {/* Description 30*/}
  <Rect x="0" y="40" rx="5" ry="5" width={cardWidth} height="20" />
  
  {/* Prix barré 30*/}
  <Rect x="0" y="60" rx="5" ry="5" width="60" height="20" />
  
  {/* Prix actuel0 */}
  <Rect x="70" y="80" rx="5" ry="5" width="90" height="20" />
  
  {/* Étiquettes (Gratuit/Proposition/etc.) 30
    <Rect x="10" y="100" rx="5" ry="5" width="70" height="25" />
    <Rect x="90" y="100" rx="5" ry="5" width="80" height="25" />
   */}
  {/* Bouton "Aller au panier" 35*/}
  <Rect x="0" y="105" rx="5" ry="5" width={cardWidth} height="30" />
</ContentLoader>

);


exports.ProductRenderSkeleton = () => {
  return (
    <View style={[renderSkeletonStyles.container]}>
      <View style={[renderSkeletonStyles.productContainer]}>
        <View style={[renderSkeletonStyles.containers]}>
            <ImageLoading />
            <BottomLoading />
        </View>

        <View style={[renderSkeletonStyles.containers]}>
            <ImageLoading />
            <BottomLoading />
        </View>
      </View>

      <View style={[renderSkeletonStyles.productContainer]}>
        <View style={[renderSkeletonStyles.containers]}>
            <ImageLoading />
            <BottomLoading />
        </View>

        <View style={[renderSkeletonStyles.containers]}>
            <ImageLoading />
            <BottomLoading />
        </View>
      </View>
    </View>
  );
}

const renderSkeletonStyles = StyleSheet.create({
  container :
  {
    flex : 1,
  },
  productContainer: {
    flexDirection : 'row',
    justifyContent : 'center',
    //alignItems : 'center',
    //backgroundColor: appColors.clearBlack,
    
  },
  containers :
  {
    //alignItems : 'center',
    marginHorizontal : marginHorizontal,
    marginVertical : marginVertical,

  },


});