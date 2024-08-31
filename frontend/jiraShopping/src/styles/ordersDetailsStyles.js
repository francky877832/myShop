import { StyleSheet, Dimensions, StatusBar, FlatList } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { screenHeight, screenWidth } from "./commentsStyles";
import { card } from './ordersStyles'


export const ordersDetailsStyles = StyleSheet.create({
    container: 
    {
        flex : 1,
    },
    flatlist:
    {
        backgroundColor : appColors.lightWhite,
        paddingHorizontal : 3,
        top : 5,
        paddingBottom : 40,
    },
    topContainer: 
    {
        backgroundColor : appColors.white,
        paddingHorizontal : 20,
        ...card,
        paddingVertical : 10,
        borderRadius : 10,
    },
    orderContainer :
    {
        backgroundColor : appColors.white,
        ...card,
        paddingVertical : 10,
        
    },
    top:
    {
        paddingHorizontal : 20,
    },
    seller:
    {
        paddingVertical : 20,
        paddingHorizontal : 20,
        borderTopWidth : 1,
        borderBottomWidth : 1,
        borderColor : appColors.lightWhite,
    },
    product : 
    {
        //
    },
    status:
    {
        flexDirection : 'row',
    },
    orderBody :
    {
        flexDirection : 'row',
        alignItems : 'center',
        //justifyContent : 'center',
    },
    productDetails :
    {

    },
    orderImg :
    {
        width : 100,
        height : 50,
    },
    image :
    {
        flex:1,
        ...card,
    },
    ordersDetails:
    {

    },
    line:
    {
        flexDirection : 'row',
    },

    text :
    {
        
    },
    textLeft :
    {
        color:appColors.gray,
        fontSize : 14,
    },
    textRight :
    {
        fontWeight : 'bold',
        color:appColors.black,
        fontSize : 14,
    },

    button :
    {
        padding : 10,
        borderRadius : 5,
    },
    buttonText :
    {
        fontWeight : 'bold',
    },
    
    
  });