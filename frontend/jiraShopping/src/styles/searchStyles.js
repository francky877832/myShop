import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const searchStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        //backgroundColor : "red",
    },
    searchBar : 
    {
        width : "100%",
        justifyContent : "center",
        alignItems : "center",
    },
    searchBarContainer :
    {
        width : "101%",
        justifyContent : "center",
        alignItems : "center",
    },
    searchBarInput :
    {
        borderWidth : 0,
        width : "100%",
        borderColor: "#fff",
    },

    filter : 
    {
        flex : 1,
        top : 25,
        flexDirection : "column",
        //backgroundColor : "blue",

    },

    priceContainer : 
    {
        flexDirection : "column",
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
    checkBox : 
    {
        flexDirection:"row", 
        justifyContent:"space-around", 
    },
   
    categorySeparator :
    {
        width: 10,
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
        height : 90,
       top : 20,
       //backgroundColor : "red",
    },
    flatlist :
    {
        flex : 1, 
        top : 10,
        paddingLeft : 20,
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

    historyContainer :
    {
       flex : 1,
       top : 40, 
    },

    historyLabelContainer:
    {
        alignSelf : "center", 
        width:"100%", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        paddingHorizontal: 20,
    },
    history:
    {
        flex : 1,
        flexDirection:"row", 
        justifyContent:"flex-start",
        alignItems : "center",
        paddingVertical : 15,
        paddingHorizontal : 10,

    },
    historyFlatlist:
    {
        flex : 1, 
        backgroundColor : "#fff",
        paddingLeft : 10,
        marginTop : 10,
    },
    textHistory :
    {
        color : "#555",
        fontFamily : appFont.secondaryFontFamily3,
        fontWeight : "bold",
        marginLeft : 10,
    },
    historySeparator:
    {
        width:"80%", 
        marginLeft : "10%",
        borderBottomWidth : 1,
        borderBottomColor : appColors.secondaryColor4,
    },

    historiqueLabel:
    {
        
    },
    vider:
    {
        color : appColors.secondaryColor1,
    },
    
    submit:
    {
        width : "100%",
        top : 20,
        bottom : 20, 
        flexDirection : "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    pressableSubmit:
    {
        flex : 1,
        backgroundColor : appColors.secondaryColor1,
        paddingVertical : 20,
    },
    textSubmit:
    {
        flex : 1,
        color : "#fff",
        textAlign : "center",
    },
    

    

})