import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const topStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : appColors.white,
    },
//A passer a searchbar
    searchBarContainer :
    {
        width : "100%",
        justifyContent : "center",
        alignItems : "center",
    },
//A passer a searchbar
    searchBarInput :
    {
        borderWidth : 0,
        width : "100%",
        borderColor: appColors.white,
    },
    inputContainerStyle : 
    {
        borderWidth : 0,
        borderColor : appColors.white,
    },

    pressableBar : 
    {
        width : "90%",
        borderWidth : 0,
        borderColor : appColors.red,
    },

    notification : 
    {
        width : "10%",
        //height : "100%",
        //borderWidth : 1,
        //borderColor : appColors.white,
    },
    
    searchBar : 
    {
        borderRadius: 5, 
    },
    


})