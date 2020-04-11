import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, } from "react-native";
import CategoriesScreen from "./CategoriesScreen";

const CategoryRecipeScreen = (props) => {
 const catId = props.navigation.getParam('categoryId')
  return (
    <View style={styles.screen}>
      <Text>The category recipe screen !</Text>
      <Button
        title="Go to Recipe Details Screen"
        onPress={() => props.navigation.navigate("Recipe")}
      />
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
export default CategoryRecipeScreen;
