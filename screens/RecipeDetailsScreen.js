import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Video } from 'expo-av';
import { ScrollView } from "react-native-gesture-handler";


const RecipeDetailsScreen = (props) => {
  const reId = props.navigation.getParam("recipeId");
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + reId;

  const [dish, setDish] = useState({
    title: "",
    instructions: "",
    video: "",
  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setDish({
          title: responseData.meals[0].strMeal,
          instructions: responseData.meals[0].strInstructions,
          video: responseData.meals[0].strYoutube,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ScrollView>
    <View style={styles.screen}>
      <Text>The Recipe Details Screen:{dish.title}</Text>
      <Text>{dish.instructions}</Text>
      <View>
      <Video
        source={{
          uri: dish.video,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
     
        shouldPlay
        style={{ width: 300, height: 300 }}
      />
      </View>
      <Button
        title="Go to Categories"
        onPress={() =>
          // go to the route screen
          props.navigation.popToTop()
        }
      />
    </View>
    </ScrollView>
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
