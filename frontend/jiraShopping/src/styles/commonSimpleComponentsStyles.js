import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const commonSimpleComponentsStyles = StyleSheet.create({
    
    likeButton : 
    {
        likeIcon :
        {
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
            flexDirection:"row", 
            justifyContent:"space-around", 
        },
        
    },
    

})