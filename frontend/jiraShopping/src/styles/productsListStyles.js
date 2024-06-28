import { StyleSheet } from "react-native";
import { appColors } from "./commonStyles";

import { paddingForProductContainer } from "./productStyles";

export const productsListStyles = StyleSheet.create({
    container : {
        flexDirection : "column",
        flex: 1,
        backgroundColor : appColors.white,
    },

    flatlist :
    {
        //flex: 1,
        flexDirection : "column",
        backgroundColor : appColors.white,
        justifyContent : "center",
        paddingHorizontal : paddingForProductContainer.horizontal/2,
    },


//HORİZONTAL FL
    containerHorizontal : 
    {
        flexDirection : "row",
        backgroundColor : appColors.white,
    },
 
    flatlistHorizontal :
    {
        //flex: 1,
        flexDirection : "row",
        backgroundColor : appColors.white,
        justifyContent : "center",
        paddingHorizontal : paddingForProductContainer.horizontal/2,
    },


})
