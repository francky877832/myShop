import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont } from "./commonStyles";

export const numProduct = 2;
export const paddingForProductContainer = { horizontal: 10, vertical: 10 };

export const marginHorizontal = 5;
export const marginVertical = 5;
export const screenWidth = Dimensions.get("window").width;
export const cardWidth =
  screenWidth / numProduct -
  marginHorizontal -
  paddingForProductContainer.horizontal;

export const productStyles = StyleSheet.create({
  container: {
    backgroundColor: appColors.secondaryColor2,
    width: cardWidth,
    //height : 100,
    marginHorizontal: marginHorizontal,
    marginVertical: marginVertical,
    paddingBottom: 5,
  },
  containerVisibility: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColors.gray,
    opacity: 0.5,
    zIndex: 999,
  },
  containerVisibilityInfo: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    zIndex: 9999 + 1,
    backgroundColor: appColors.secondaryColor5,
    opacity: 1,
  },
  //Horizontal container ?
  containerHorizontal: {
    backgroundColor: appColors.secondaryColor2,
    width: screenWidth / 2,
    //height : 100,
    marginHorizontal: marginHorizontal,
    marginVertical: marginVertical,
    paddingBottom: 5,
  },
  imageHorizontal: {
    width: "100%",
    //height: 300 * 1.2,
    borderRadius: 0,
  },

  pressable: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: cardWidth * 1.3,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  shopName: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: appFont.mainFontFamily,
    color: "gray",
  },
  productName: {
    //fontWeight : "bold",
    fontStyle: "normal",
    fontFamily: appFont.mainFontFamily,
    color: appColors.secondaryColor5,
    //paddingTop : 7,
    alignSelf: "end",
    fontSize: 11,
    textAlign: "left",
    flexWrap: "wrap",
    paddingRight: 3,
    // backgroundColor: "pink",
    width: "65%",
  },
  price: {
    color: appColors.secondaryColor1,
    fontWeight: "bold",
  },

  top: {
    height: 30,
    width: "100%",
    position: "absolute",
    //top : -cardWidth * 1.2,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 3,
    //marginLeft : -5,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: appColors.lightGray,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottom: {
    top: 5,
    borderRadius: 15,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 2,
    marginBottom: 0,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: appColors.secondaryColor1,
    flexDirection: "row",
    justifyContent: "center",
  },
  bottom1: {
    top: 5,
    // borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginBottom: 0,
    // borderWidth: 1,
    borderColor: appColors.secondaryColor1,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  category: {
    fontSize: 11,
    // fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: appFont.mainFontFamily,
    color: appColors.secondaryColor1,
  },
  feesBy: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appColors.secondaryColor5,
    paddingRight: 4,
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  bottomIconsButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
    flexWrap: "wrap",
    width: 35,
  },

  card: {
    borderRadius: 15,
    shadowColor: appColors.lightWhite,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },

  isBasketPresent: {
    backgroundColor: appColors.mainColor,
    borderColor: appColors.mainColor,
  },
  isBasketPresentText: {
    color: appColors.lightBlack,
  },
});
