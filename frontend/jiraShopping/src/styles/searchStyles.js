import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const searchStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
    },
    searchBar : 
    {
        
    },

    filter : 
    {
        top : 25,
    },

    price : 
    {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",

    },
    minPrice : 
    {
        paddingHorizontal : 2,
        flex : 1,
        paddingLeft : 5,
    },
    maxPrice : 
    {
        paddingHorizontal : 2,
        flex : 1,
        paddingRight : 5,
    },
    label : 
    {
        alignSelf : "center",
        fontSize : 15,
        fontStyle : appFont.mainFontFamily,
    },
    input : 
    {
        width : "100%",
        height: 20,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal : 20,
        fontSize: 14,
        color: "#000",
        backgroundColor: '#fff',
        flex : 1,
        fontFamily : appFont.mainFontFamily,
        justifyContent : "center", 
    },

    inputFocused : 
    {
        borderColor: appColors.secondaryColor1, 
    },

    condition :
    {
        flexDirection:"column", 
        justifyContent:"space-around",
        backgroundColor : appColors.mainColor,
        marginTop : 25,
    },
    checkBox : 
    {
        flexDirection:"row", 
        justifyContent:"space-around", 
    },
   


})