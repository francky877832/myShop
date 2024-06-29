import {StyleSheet, Platform } from "react-native";


export const appColors = {
    mainColor : "#F0F0F0",
    secondaryColor1 : "#f27a1a",
    lightOrange : "rgba(242, 122, 26, 0.1)",
    secondaryColor2 : "#fff",
    secondaryColor3 : "#ccc",
    secondaryColor4 : "#777",
    secondaryColor5 : "#444",
    red : "red",
    blue : "rgb(32, 137, 220)",
    green : "green",
    orange : "orange",
    white : "#fff",
    lightBlack : "rgba(0, 0, 0, 0.2)",
    black : "rgba(0, 0, 0, 0.9)",
    clearBlack : "rgba(0, 0, 0, 0.7)",
    lightWhite : "rgb(240, 240, 240)",
    lightWhite2 : "rgba(240, 240, 240, 0.02)",
}

export const appFont = {
    mainFontFamily : "Arial",
    secondaryFontFamily1 : Platform.select({
        ios: 'Helvetica',
        android: 'Roboto',
      }),
    secondaryFontFamily2 : "Georgia",
    secondaryFontFamily3 : "Verdana",
    secondaryFontFamily4 : "Courier",

}

export const appFontSize = {
    mainFontSize : 14,

}
export const customText = {
    text :
    {
        fontFamily : appFont.secondaryFontFamily3,
        fontSize : appFontSize.mainFontSize,
        color : appColors.black,
    },
}

export const inputTextStyle = {
    fontSize: 16,
    color: appColors.secondaryColor5,
    backgroundColor: appColors.white,
    fontFamily : appFont.mainFontFamily,
    fontWeight : "bold",

}
