import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const preferencesStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        top : 0,
        backgroundColor : appColors.white,

    },
    top :
    {
        backgroundColor : appColors.white,
        borderBottomWidth : 1,
        borderBottomColor : appColors.lightWhite,
    },
    list :
    {
        flex : 1,
        top : 10, 
        paddingBottom : 30,
    },

})