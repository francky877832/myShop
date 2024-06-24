import {StyleSheet, Platform } from "react-native";


export const appColors = {
    mainColor : "#F0F0F0",
    secondaryColor1 : "#f27a1a",
    secondaryColor2 : "#fff",
    secondaryColor3 : "#ccc",
    secondaryColor4 : "#777",
    secondaryColor5 : "#444",
    red : "red",
    blue : "rgb(32, 137, 220)",
    green : "green",
    orange : "orange",
    white : "#fff",
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