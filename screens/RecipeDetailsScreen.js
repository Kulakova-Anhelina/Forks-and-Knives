import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";

const RecipeDetailsScreen = (props) => {
  const reId = props.navigation.getParam("recipeId");
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + reId;
  const [dish, setDish] = useState({
    title: "",
    instructions: "",
    video: "",
    picture: "",
  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setDish({
          picture: responseData.meals[0].strMealThumb,
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
        <View>
          <Image
            source={{ uri: dish.picture }}
            style={{ width: 150, height: 100 }}
          />
        </View>
        <Text>{dish.title}</Text>
        <Text>{dish.instructions}</Text>
        <View style={{ flex: 1 }}>
          <WebView
            style={{ marginTop: 20 , width: 350,height: 200}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: dish.video }}
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
