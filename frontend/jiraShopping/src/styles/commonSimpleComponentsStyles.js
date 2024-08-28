import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { productStyles } from "./productStyles";
import { ActivityIndicator } from "react-native-paper";



export const commonSimpleComponentsStyles = StyleSheet.create({
    
    likeButton : 
    {
        likeIcon :
        {
            //...productStyles.card, isCard paramater
            width : 25,
            height : 25,
        },
        
    },
    shareButton : 
    {
        container :
        {
            flex : 1,
            flexDirection : "row",
            paddingHorizontal : 10,
        },
        
    },

    prevButton : 
    {
        container :
        {
            flex : 1,
            flexDirection : "row",
            paddingHorizontal : 10,
        },
        
    },
    customText : 
    {
        container :
        {
            flex : 1,
            flexDirection : "row",
            paddingHorizontal : 10,
        },
        
    },

    conditionChoice : 
    {
        checkBox : 
        {
            flexDirection:"column", 
            justifyContent:"space-around", 
        },
        
    },

    activityIndicator :
    {
        container :{
            position : "absolute",
            left : 0,
            right : 0,
            top : 0,
            bottom : 0,
            backgroundColor : appColors.lightOrange,
        },
        icon :
        {

        },
        activityIndicator:{
            width : "100%",
            height : "100%",
            alignSelf : "center",
            justifyContent : "center",
            alignContent : "center",
        },
        
    },

    priceDetails : 
    {
       container :
       {
            padding : 10,
            backgroundColor : appColors.black,
       },
       title:
       {
            fontWeight : 'bold',
            color : appColors.white,
       },
       priceLine:
       {
            flexDirection : 'row',
            justifyContent : 'space-between',
            alignItems : 'center',
            paddingVertical : 5,
       },
       semiTitle:
       {
            color : appColors.secondaryColor3,
       },
       price:
       {
            fontWeight : 'bold',
            color : appColors.white,
       },
       totalPriceLine:
       {
            backgroundColor : appColors.secondaryColor1,
            padding : 5,
       },
       totalPriceText:
       {
            color : appColors.white,
            fontWeight : 'bold',
       }
        
    },

    temporaryNotification :
    {
        container :
        {
            backgroundColor : appColors.clearBlack,
            position : 'absolute',
            bottom : 0,
            left : 0,
            right : 0,
            padding : 20,
            justifyContent : 'center',
            alignItems : 'center',
        },
        message:
        {
            color : appColors.white,
        },
    },

    

})