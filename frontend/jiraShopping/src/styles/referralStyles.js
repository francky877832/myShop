import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText } from "./commonStyles";

import { productStyles } from "./productStyles";



export const referralStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
    },

    menu :
    {
        alignItems : 'center',
    },

    referralElement: 
    {
        justifyContent : 'center',
        alignItems : "center",
        width : 100,
    },
    unavailable :
    {
        backgroundColor : appColors.s,
        color : appColors.gray,
    } ,

    button:
    {
        ...productStyles.card,
        shadowColor : appColors.white,
        justifyContent : "center",
        alignItems : "center",
        height : 50,
        borderRadius : 5,
    },
    buttonText:
    {
        textAlign : "center",
        fontWeight : "bold",
    },
    text :
    {
        ...customText.text,
        textAlign : 'center',
    },
   

})