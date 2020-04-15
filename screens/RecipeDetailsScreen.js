import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const RecipeDetailsScreen = (props) => {
  const reId = props.navigation.getParam("recipeId");
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + reId;

  const [dish, setDish] = useState({
    title: '',
    instructions: '',

  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setDish({
          title: responseData.meals[0].strMeal,
          instructions:responseData.meals[0].strInstructions
        });
      })
      .catch((error) => console.log(error));
  }, []);





  return (
    <View style={styles.screen}>
      <Text>The Recipe Details Screen:{dish.title}</Text>
      <Button
        title="Go to Categories"
        onPress={() =>
          // go to the route screen
          props.navigation.popToTop()
        }
      />
    </View>
  );
};

//dynamic function to render the title of the page
RecipeDetailsScreen.navigationOptions = (data) => {
  console.log(data);
  const reId = data.navigation.getParam("recipeId");
  return {
    headerTitle: reId,
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
export default RecipeDetailsScreen;
