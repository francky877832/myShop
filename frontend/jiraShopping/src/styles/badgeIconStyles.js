import { StyleSheet } from "react-native";
import { appColors } from "./commonStyles";
import { appFont } from "./commonStyles";

const badgeIconStyles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    margin: 5,
  },
  badgeContainer: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "green",
    borderRadius: 55,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default badgeIconStyles;
