import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';

//custom component
import Product from './Product';
import { CustomActivityIndicator } from '../common/CommonSimpleComponents'
import { ProductRenderSkeleton } from './FlatListCommonComponent'
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { numProduct } from '../../styles/productStyles';

//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';
import { ProductContext } from '../../context/ProductContext';

import { server } from '../../remote/server';
import { appColors } from '../../styles/commonStyles';

const ProductsList = React.forwardRef((props, ref) => {
    const { datas, horizontal, styles, onEndReached, onScroll, name, isLoading, replace, hasMore, onEndReachedThreshold,
         minified, updateProfileLike, origin
        } = props;
        const [firstLoading, setFirstLoading] = useState(true)
    //console.log(datas[0].product)
    
    useEffect(()=>{
        //console.log(datas)
        
        /*if(isLoading)
        {
            setFirstLoading(false)
        }*/
    }, [])
    if(datas.length <= 0)
    {
        return(
            <ProductRenderSkeleton isLoading={isLoading} width={300} height={300} marginBottom={20} />
        )
    }
    
    return(
            <View style={[productsListStyles.container, horizontal ? productsListStyles.containerHorizontal : false, styles.productContainer]}>
                    
                    
                    <FlatList
                        data={datas}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return <Product origin={origin} updateProfileLike={updateProfileLike} minified={minified} name={name} item={item} replace={replace} styles={productsListStyles.listItem} horizontal={horizontal}/> } }
                        keyExtractor={ (item) => { return Math.random().toString(); } }
                        horizontal={horizontal}
                        numColumns={ horizontal ? 1 : numProduct }
                        ItemSeparatorComponent={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={horizontal}
                        contentContainerStyle={[productsListStyles.flatlist, horizontal ? productsListStyles.flatlistHorizontal : false, styles.flatlist]}
                        ref={ref}
                        onEndReached={()=>{typeof(onEndReached)=='function' ? onEndReached():function(){}}}
                        onEndReachedThreshold={onEndReachedThreshold || 0.5}
                        onScroll={(e)=>{typeof(onScroll)=='function' ? onScroll(e):function(e){}}}
                        scrollEventThrottle={16}
                        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={appColors.secondaryColor1} /> : null}
                    />
                 
            </View>
    )
})

export default  React.memo(ProductsList)