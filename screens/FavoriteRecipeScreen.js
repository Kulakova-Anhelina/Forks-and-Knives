import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const FavoriteRecipeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Favourite screen!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
});

FavoriteRecipeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My recipe book",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default FavoriteRecipeScreen;
