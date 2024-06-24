import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const topStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        flexDirection : "row",
        paddingHorizontal : 10,
        
    },
    searchBarContainer : 
    {
        backgroundColor : appColors.mainColor,
        borderRadius : 40,
    },
    searchBarInput : 
    {
        borderWidth : 0,
        borderRadius : 20,
        backgroundColor : appColors.white,
    },
    pressableBar : 
    {
        width : "90%"
        
    },

    notification : 
    {
       
        
    },
    
    searchBar : 
    {
        borderRadius: 5, 
    },
    


})