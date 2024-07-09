import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, customText, inputTextStyle} from "./commonStyles";
import { screenHeight } from "./commentsStyles";



export const filtersStyles = StyleSheet.create({

    contentContainerStyle :
    {
        height : 40+55,
    },
    container :
    {
        backgroundColor : appColors.white,
        //flex:1,
        zIndex : 98,
        flex : 1,
        //paddingTop : 5,
       ////paddingBottom : 10,
       //backgroundColor : appColors.red,
    },

    modal :
    {
        //flex : 1,
        paddingBottom : 5,
        borderTopWidth : 1,
        borderTopColor : appColors.secondaryColor3,
        //borderBottomWidth : 1,
        //borderBottomColor : appColors.secondaryColor1,
        backgroundColor : appColors.white,
        zIndex : 100,
        position : "absolute", //sor du flow de contentContainerStyle puisque qu!il a un height fixe : 40+55 
        left : 0,
        right : 0,
        top : 40+55,
        borderWidth : 1,
        borderBottomColor : appColors.secondaryColor4,
        borderRadius: 5,
        shadowColor: appColors.lightWhite,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : appColors.lightWhite,
        //paddingTop : 5,
        justifyContent : "center",
        alignItems : "center",
    },
    topContainer :
    {
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems : "center",
        //borderWidth : 1,
        //borderBottomWidth : 1,
        //borderBottomColor : appColors.secondaryColor3,
        //borderTopWidth : 1,
        //borderTopColor : appColors.lightWhite,
        backgroundColor : appColors.white,
        //height : 40,  
        flex : 1, //40+55 for topMostContainer
    },
    topMostContainer :
    {
        //height : 40+55,
        flex : 1,
       // borderWidth : 1,
    },
      
    filtres :
    {
        justifyContent : "center",
        paddingHorizontal : 5,
        borderTopWidth : 1,
        borderTopColor : appColors.secondaryColor3,
        flex : 1,//40+55 for topMostContainer
        //height : 55, 
        backgroundColor : appColors.white,
        zIndex : 100,
    },
    categoryContainer :
    {
        width: "100%",
        //height : 300,
        top : 10,
        paddingBottom : 25,
        justifyContent:"center",
    },
    orderByContainer :
    {
        width: screenWidth,
        marginTop : 40+10,
        alignItems : "flex-start",
        backgroundColor : appColors.white,
        position : "absolute",
        paddingTop : 20,
        //bottom : 0, left : 0, right : 0, backgroundColor : "red",
        zIndex : 101,

        borderRadius: 5,
        shadowColor: appColors.lightWhite,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor : appColors.lightWhite,
        //paddingTop : 5,
        justifyContent : "center",
        alignItems : "center",
        borderBottomWidth : 1,
        borderBottomColor : appColors.secondaryColor4,
    },
  

    similarContainer : 
    {
        top :60,
        paddingBottom : 5,
        backgroundColor : appColors.lightWhite,
    },

    modalVisibleText : 
    {
        color: appColors.secondaryColor1
    },

    priceContainer : 
    {
        flexDirection : "column",
        marginTop : 10,
        width: screenWidth,
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
        ...customText.text,
        ...inputTextStyle,
        width : "100%",
        height: 40,
        borderColor : appColors.secondaryColor3,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal : 20,
        flex : 1,
        justifyContent : "center", 
        backgroundColor : appColors.white,
    },

    inputFocused : 
    {
        borderColor: appColors.secondaryColor1, 
    },

    conditionContainer :
    {
        flexDirection:"column", 
        justifyContent:"space-around",
        marginTop : 10,
        width: screenWidth,
        /*position:"absolute",
        top:0,
        left:0,right:0,
        zIndex : 100,*/
    },
   
    categorySeparator :
    {
        width: 20,
    },
     
    radioContainer: 
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        left : 40,
    },
    radioBox: 
    {
        alignSelf : "flex-start",
        width : "100%",
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
    
    filterFlatlist :
    {
        //flex : 1, 
        top : 10,
        alignSelf : "center",
        width : "100%",
        //backgroundColor:"red",
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


    trierFiltrer :
    {
        flex : 1,
       flexDirection : "row",
       justifyContent:"center",
       alignItems : "center",
       //paddingHorizontal : 20,
       //paddingVertical : 10,
       height : "100%", //OK!

    },
    trierFiltrerFocused :
    {
        borderTopWidth : 1,
        borderTopColor : appColors.secondaryColor1,
    },

    pressableFilter :
    {
       borderWidth : 1,
       borderColor : appColors.secondaryColor3,
       padding : 7,
       paddingHorizontal : 10,
       borderRadius : 20,
       flexDirection : "row",
    },
    pressableFilterFocused :
    {
        borderWidth : 2,
        borderColor : appColors.secondaryColor1,
        backgroundColor : appColors.lightOrange,
    },
/*
    cardItem : 
    {
        borderRadius: 80,
        shadowColor: appColors.lightWhite,
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 50,
        backgroundColor : appColors.lightWhite,
        paddingTop : 10,
    },
  /*  cardItem : 
    {
        borderRadius: 20,
        shadowColor: appColors.lightWhite,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 50,
        backgroundColor : appColors.lightWhite,
    },
*/
   
//FOR PRODUCTLIST
    productContainer :
    {
        backgroundColor : appColors.lightWhite,
    },
    flatlist :
    {
        backgroundColor : appColors.lightWhite,
    },

  
})