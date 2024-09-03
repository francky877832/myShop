import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText } from "./commonStyles";

import { productStyles } from "./productStyles";



export const referralDetailsStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
    },
    text :
    {
        ...customText.text,
        textAlign : 'center',
    },
   

})