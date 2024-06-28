import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const topStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 10,
    },
//A passer a searchbar
    searchBarContainer :
    {
        width : "101%",
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

    pressableBar : 
    {
        width : "90%"
        //flex : 1,
    },

    notification : 
    {
       
        
    },
    
    searchBar : 
    {
        borderRadius: 5, 
    },
    


})