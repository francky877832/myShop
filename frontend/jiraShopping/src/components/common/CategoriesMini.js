import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { name: "Home", icon: "home-outline" },
  { name: "Favourites", icon: "heart-outline" },
  { name: "Shop", icon: "bag-handle" },
  { name: "Basket", icon: "basket" },
  { name: "Account", icon: "person-circle" },
  { name: "Home", icon: "home-outline" },
  { name: "Favourites", icon: "heart-outline" },
  { name: "Shop", icon: "bag-handle" },
  { name: "Basket", icon: "basket" },
  { name: "Account", icon: "person-circle" },
];

const CategoryList = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={category.icon} size={18} color="white" />
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 5,
  },
  categoryContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 25, // Cercle
    backgroundColor: "#007AFF", // Couleur de fond de l'icône
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    marginTop: 5,
    fontSize: 11,
    color: "black", // Couleur du texte
  },
});

export default CategoryList;
