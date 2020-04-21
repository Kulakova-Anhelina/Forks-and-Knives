//in app container we have to load our route navigator
//we use simple stack navigation for 3 screens
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryRecipeScreen from "../screens/CategoryRecipeScreen";
import RecipeDetails from "../screens/RecipeDetailsScreen";
import Colors from "../constants/Colors";


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

export default createAppContainer(AppNavigator);
