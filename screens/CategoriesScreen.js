import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CategoriesScreen = (props) => {
  console.log(props);

  return (
    <View style={styles.screen}>
      <Text> The category screen!</Text>
      <Button
        title="Go to Category Recipe"
        onPress={() =>
          //routeName shoud be one of the names we created in navigation folder
          //navigate take an object and we pass identifier
          props.navigation.navigate("CategoryRecipe")
        }
      />
 
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
export default CategoriesScreen;
