import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import RecipeNavigation from "./navigation/RecipeNavigation";
import {enableScreens} from 'react-native-screens';

// for better perfomence, difference is not visible
enableScreens()

const customFonts = () => {
  Font.loadAsync({
    roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [loadedFonts, setLoadedFonts] = useState(false);
  if (!loadedFonts) {
    return (
      <AppLoading
        startAsync={customFonts}
        onFinish={() => setLoadedFonts(true)}
      />
    );
  }

  return <RecipeNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
