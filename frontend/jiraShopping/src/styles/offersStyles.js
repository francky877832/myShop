import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, customText} from "./commonStyles";


import { commentsStyles } from "./commentsStyles";


export const offersStyles = StyleSheet.create({
    container :
    {
        
    },
    offers :
    {

    },

    offersLeft :
    {

    },
    offersRight :
    {

    },

    input :
    {
        ...commentsStyles.input,
    },
    inputFocused :
    {
        ...commentsStyles.inputFocused,
    },
    searchBarInput :
    {
        ...commentsStyles.searchBarInput,
    },
    rightIcon :
    {
        ...commentsStyles.sendButton,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
    },
    money : 
    {
        ...customText.text,
        fontWeight : "bold",
    }
})