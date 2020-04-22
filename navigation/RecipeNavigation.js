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
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";


const defaultStackNavOptions =  {
  headerTintColor: Colors.buttonColor,
  headerTitleStyle: {
    fontFamily: 'roboto-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'roboto'
  }

}

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
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

//navigator for favourite
const FavNavig = createStackNavigator(
  {
    Favourites: {
      screen: FavoriteRecipeScreen,
    },
    Recipe: {
      screen: RecipeDetails,
    },
  },
  {
    //deault card
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions,
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
        tabBarLabel: 'Recipes'
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
    tablabelStyle:{
      fontFamily: 'roboto-bold'
    },
  
  }
);

//stack navigator for filters
const FilterNav = createStackNavigator(
  {
    Filter: {
      screen: FiltersScreen,
    },
  },
  {
    //deault card
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

//drawer
const MainNav = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTab,
    navigationOptions: {
      drawerLabel:'Recipe',
    },
  },
  Filters: { screen: FilterNav },
  
 
},
{contentOptions: {
  activeTintColor: Colors.buttonColor,
  labelStyle :{
    fontFamily: 'roboto-bold'
  }
}});

export default createAppContainer(MainNav);
