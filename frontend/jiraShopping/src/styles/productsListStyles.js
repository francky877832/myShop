import { StyleSheet } from "react-native";
import { appColors } from "./commonStyles";

import { paddingForProductContainer } from "./productStyles";

export const productsListStyles = StyleSheet.create({
    container : {
        flexDirection : "column",
        flex: 1,
        backgroundColor : appColors.mainColor,

    },

    productList :{
        flex: 1,
        flexDirection : "column",
        alignItems : "center",
        alignSelf : "center",
    },

    flatlist :{
        flex: 1,
        flexDirection : "column",
        backgroundColor : appColors.mainColor,
        justifyContent : "center",
        paddingHorizontal : paddingForProductContainer.horizontal,
    },


})
