import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import RecipeNavigation from "./navigation/RecipeNavigation";
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'

import  recipeReducer from './store/reducers/recipe'

// for better perfomence, difference is not visible
enableScreens()

const rootReducer = combineReducers ({
  recipe: recipeReducer
})
const store = createStore(rootReducer);

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

  return <Provider
   store = {store}>
   <RecipeNavigation />
   </Provider>;
}


