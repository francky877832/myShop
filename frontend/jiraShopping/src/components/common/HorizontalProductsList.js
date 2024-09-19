import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';

//custom component
import Product from './Product';
import { CustomActivityIndicator } from '../common/CommonSimpleComponents'
import { ProductRenderSkeleton } from './FlatListCommonComponent'
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { numProduct } from '../../styles/productStyles';
import EmptyListt from './EmptyList';
//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';
import { ProductContext } from '../../context/ProductContext';

import { server } from '../../remote/server';
import { appColors } from '../../styles/commonStyles';

const HorizontalProductsList = React.forwardRef((props, ref) => {
    const { datas, horizontal, styles, onEndReached, onScroll, name, isLoading, replace, hasMore, onEndReachedThreshold,
         minified, updateProfileLike, origin, emptyIcon, bottomIcon
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
    /*if(datas.length <= 0)
    {
        return(
            <ProductRenderSkeleton isLoading={isLoading} width={300} height={300} marginBottom={20} />
        )
    }*/
   const data = datas
    
    return(

            <FlatList
                        data={data}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return <Product bottomIcon={bottomIcon} origin={origin} updateProfileLike={updateProfileLike} minified={minified} name={name} item={item} replace={replace} styles={productsListStyles.listItem} horizontal={horizontal}/> } }
                        keyExtractor={ (item) => { return item._id.toString(); } }
                        horizontal={true}
                        ItemSeparatorComponent={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={horizontal}
                        scrollEnabled={true}
                        contentContainerStyle={[{} ]}
                        style={[{paddingBottom:20}]}
                        //style={{backgroundColor:'red'}}
                        //datas.length <= 0 && !isLoading
                        
            />
    )
})

export default  React.memo(HorizontalProductsList)