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
        width : "100%",
    },
    inputContainerStyle : 
    {
        borderColor : appColors.white,
    },

    pressableBar : 
    {
        width : "90%",
    },

    notification : 
    {
        
    },
    
    searchBar : 
    {
        borderRadius: 5, 
    },
    


})