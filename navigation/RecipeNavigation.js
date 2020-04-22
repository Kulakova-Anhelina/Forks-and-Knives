//in app container we have to load our route navigator
//we use simple stack navigation for 3 screens
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryRecipeScreen from "../screens/CategoryRecipeScreen";
import RecipeDetails from "../screens/RecipeDetailsScreen";
import FavoriteRecipeScreen from "../screens/FavoriteRecipeScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const AppNavigator = createStackNavigator(
  {
    //mapping to the screens from folder screens
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryRecipe: {
      screen: CategoryRecipeScreen,
    },
    Recipe: {
      screen: RecipeDetails,
    },
  },
  {
    //deault card
    mode: "modal",
    defaultNavigationOptions: {
      headerTintColor: Colors.buttonColor,
    },
  }
);

//navigator for favourite
const FavNavig = createStackNavigator(
  {
    Favourites:{
      screen: FavoriteRecipeScreen,
    },
    Recipe: {
      screen: RecipeDetails,
    }
  },
  {
    //deault card
    mode: "modal",
    defaultNavigationOptions: {
      headerTintColor: Colors.buttonColor,
    },
  }
);

const MealsFavTab = createBottomTabNavigator(
  {
    Meals: {
      screen: AppNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favourites: {
      screen: FavNavig,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-heart" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.buttonColor,
    },
  }
);

export default createAppContainer(MealsFavTab);
