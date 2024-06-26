import { StyleSheet } from "react-native";
import { appColors } from "./commonStyles";

import { paddingForProductContainer } from "./productStyles";

export const productsListStyles = StyleSheet.create({
    container : {
        flexDirection : "column",
        flex: 1,
        backgroundColor : appColors.mainColor,
    },

    flatlist :
    {
        //flex: 1,
        flexDirection : "column",
        backgroundColor : appColors.mainColor,
        justifyContent : "center",
        paddingHorizontal : paddingForProductContainer.horizontal,
    },


//HORİZONTAL FL
    containerHorizontal : 
    {
        flexDirection : "row",
        backgroundColor : appColors.mainColor,
    },
 
    flatlistHorizontal :
    {
        //flex: 1,
        flexDirection : "row",
        backgroundColor : appColors.mainColor,
        justifyContent : "center",
        paddingHorizontal : paddingForProductContainer.horizontal,
    },


})
