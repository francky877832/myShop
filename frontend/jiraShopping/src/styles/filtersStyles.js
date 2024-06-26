import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth} from "./commonStyles";



export const filtersStyles = StyleSheet.create({
    container :
    {
        backgroundColor : appColors.white,
        //flex : 1,
        paddingTop : 10,
        paddingBottom : 30,
    },

    priceContainer : 
    {
        flexDirection : "column",
        top : 20,
        backgroundColor : appColors.lightWhite,
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
        borderColor : "#ccc",
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

    conditionContainer :
    {
        flexDirection:"column", 
        justifyContent:"space-around",
        backgroundColor : appColors.mainColor,
        marginTop : 25,
    },
   
    categorySeparator :
    {
        width: 20,
    },
    categoryContainer :
    {
        backgroundColor:appColors.lightWhite,
        width: screenWidth,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    categoryFocused :
    {
        backgroundColor : appColors.secondaryColor1,
        borderWidth : 1,
        borderColor : appColors.white,
    },
    textCategoryFocused :
    {
        color : appColors.white,
    },

    label :
    {
       fontFamily : appFont.secondaryFontFamily3,
       fontWeight : "bold",
       color : appColors.secondaryColor5,
    },
    categoryContainer :
    {
        //height : 90,
        top : 20,
        paddingBottom : 50,
       //backgroundColor : "red",
    },
    flatlist :
    {
        //flex : 1, 
        top : 10,
    },
    category :
    {
        justifyContent : "center",
        backgroundColor : "#fff",
        borderWidth : 1, 
        borderColor : "#ccc",
        paddingVertical : 5,
        paddingHorizontal : 10,
        borderRadius : 15,
        height : 35,
    },
    textCategory :
    {
        color : "#555",
        fontFamily : appFont.mainFontFamily,
        fontSize : 12,
        fontWeight : "bold",
    },



    topContainer :
    {
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft: 10,
        borderBottomWidth : 1,
        borderBottomColor : appColors.lightWhite,
        backgroundColor : appColors.white,
    },
    trier :
    {
       
        justifyContent : "center",
        alignItems : "center",

    },

    filtres :
    {
        justifyContent : "center",
        
    },
    pressableFilter :
    {
       borderWidth : 1,
       borderColor : appColors.secondaryColor3,
       padding : 7,
       paddingHorizontal : 10,
       borderRadius : 20,
    },
    pressableFilterFocused :
    {
       borderColor : appColors.secondaryColor1,
    },
   

})