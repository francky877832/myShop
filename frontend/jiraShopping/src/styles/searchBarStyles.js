import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";


export const searchBarStyles = StyleSheet.create({
    container: 
    {
        flex : 1,
        borderWidth: 0,
        borderColor: appColors.mainColor,
        backgroundColor : appColors.white,
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        height : 35,
        paddingTop : 5,
    },
    input : 
    {
        width: '100%',
        height: 35,
        borderColor: appColors.lightWhite,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal : 20,
        fontSize: 16,
        color: '#333',
        backgroundColor: appColors.white,
        fontFamily : appFont.mainFontFamily,
        justifyContent : "center",
        alignItems : "center",
    },
   
    inputFocused : 
    {
        borderColor: appColors.secondaryColor1,
    },

    
})
