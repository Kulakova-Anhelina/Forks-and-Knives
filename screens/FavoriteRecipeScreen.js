import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const FavoriteRecipeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Favourite screen!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center"
  }
});
export default FavoriteRecipeScreen;
