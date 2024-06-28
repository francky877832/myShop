import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { productStyles } from "./productStyles";



export const commonSimpleComponentsStyles = StyleSheet.create({
    
    likeButton : 
    {
        likeIcon :
        {
            ...productStyles.card,
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
    

})