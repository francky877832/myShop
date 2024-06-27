import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, customText} from "./commonStyles";



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
        marginTop : 25,
        width: screenWidth,
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
        marginTop : 25,
        width: screenWidth,
    },
   
    categorySeparator :
    {
        width: 20,
    },
    categoryContainer :
    {
        width: "100%",
        top : 20,
        paddingBottom : 50,
        justifyContent:"center",
    },
    orderByContainer :
    {
        width: screenWidth,
        marginTop : 25,
        alignItems : "flex-start",
    },
    trier :
    {
       
        justifyContent : "center",
        alignItems : "space-around",

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
        ...customText.text,
       fontFamily : appFont.secondaryFontFamily3,
       fontWeight : "bold",
       color : appColors.secondaryColor5,
    },
    
    flatlist :
    {
        //flex : 1, 
        top : 10,
        alignSelf : "center",
        width : "100%",
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
        
        backgroundColor : appColors.white,
    },


    filtres :
    {
        justifyContent : "center",
        borderBottomWidth : 1,
        borderBottomColor : appColors.lightBlack,
        borderLeftColor : appColors.lightBlack,
        borderRadius : 20,
        
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
        borderWidth : 2,
       borderColor : appColors.secondaryColor1,
       backgroundColor : appColors.lightOrange,
    },
   

})