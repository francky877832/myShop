import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, customText, inputTextStyle} from "./commonStyles";



export const filtersStyles = StyleSheet.create({
    container :
    {
        backgroundColor : appColors.white,
        flex : 1,
        //paddingTop : 5,
       //paddingBottom : 10,
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
    
    filtres :
    {
        //top : 10,
        justifyContent : "center",
        paddingHorizontal : 5,
        borderTopWidth : 1,
        borderTopColor : appColors.secondaryColor3,
    },
    modal :
    {
        flex : 1,
        paddingBottom : 5,
        borderTopWidth : 1,
        borderTopColor : appColors.lightWhite,
        borderBottomWidth : 1,
        borderBottomColor : appColors.secondaryColor1,
        zIndex : 99,
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
        ...customText.text,
        ...inputTextStyle,
        width : "100%",
        height: 20,
        borderColor : appColors.secondaryColor3,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal : 20,
        flex : 1,
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
        backgroundColor : appColors.lightWhite2,
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
        justifyContent:"space-around",
        alignItems : "center",
        borderBottomWidth : 1,
        borderBottomColor : appColors.secondaryColor3,
        borderTopWidth : 1,
        borderTopColor : appColors.lightWhite,
        //backgroundColor : appColors.red,
        //height : 200,
    
    },
    trierFiltrer :
    {
        flex : 1,
       flexDirection : "row",
       justifyContent:"center",
       alignItems : "center",
       paddingHorizontal : 20,
       paddingVertical : 10,

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

    cardItem : 
    {
        borderRadius: 80,
        shadowColor: appColors.lightWhite,
        shadowOffset: { width: 10, height: 20 },
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
    }


})