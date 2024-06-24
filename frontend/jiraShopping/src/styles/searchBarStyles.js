import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";


export const searchBarStyles = StyleSheet.create({
    container: 
    {
        borderWidth: 1,
        borderColor: appColors.mainColor,
        backgroundColor : appColors.white,
    },
    input : 
    {
        width: '100%',
        height: 35,
        borderColor: "gray",
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal : 20,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        flex : 1,
        fontFamily : appFont.mainFontFamily,
        justifyContent : "center",
    },
    inputFocused : 
    {
        borderColor: appColors.secondaryColor1,
    },

    
})
