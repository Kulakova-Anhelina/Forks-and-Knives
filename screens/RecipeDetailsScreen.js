import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import * as firebase from "firebase";
import { Rating, AirbnbRating } from "react-native-elements";
import { Card } from 'react-native-elements';

const firebaseConfig = {
  apiKey: "AIzaSyBjvrhK0d_KRfWr6NLN8BcDwTuavcDXbvQ",
  authDomain: "knivescooking.firebaseapp.com",
  databaseURL: "https://knivescooking.firebaseio.com",
  projectId: "knivescooking",
  storageBucket: "knivescooking.appspot.com",
  messagingSenderId: "237143204809",
  appId: "1:237143204809:web:8be56503de1049914d3e18",
  measurementId: "G-MFFBYS9HRE",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const RecipeDetailsScreen = (props) => {
  const reId = props.navigation.getParam("recipeId");
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + reId;
  const [dish, setDish] = useState({
    title: "",
    instructions: "",
    video: "",
    picture: "",
  });

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    firebase.database().ref("raiting/").push({ title: dish.title, rating: rating });
  };

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

  const saveItem = () => {
    firebase.database().ref("items/").push({ title: dish.title });
  };

  //dynamic function to render the title of the page
  RecipeDetailsScreen.navigationOptions = (data) => {
    console.log(data);

    const reId = data.navigation.getParam("recipeId");
    return {
      headerTitle: reId,
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favourite"
            iconName="ios-heart"
            onPress={(item) => {
              saveItem(item);
            }}
          />
        </HeaderButtons>
      ),
    };
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <ImageBackground source={{ uri: dish.picture }} style={styles.bgImage}>
          <Text style={styles.title}>{dish.title}</Text>
        </ImageBackground>
        <View style={styles.container}>
          <Text style={styles.text}>{dish.instructions}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <WebView
            style={styles.view}
            source={{ uri: dish.video }}
            originWhitelist={["*"]}
          />
        </View>
        <Card title="How do you like it?" containerStyle={styles.card}>
            <AirbnbRating 
                starContainerStyle={{
                    alignSelf: "center",
                    backgroundColor: "white"
                }} 
             
                showRating 
                count={5}
                defaultRating={null}
                onFinishRating={ratingCompleted}
            />
          </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  text: {
    fontFamily: "roboto",
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 20,
  },

  view: {
    width: 400,
    height: 200,
  },

  bgImage: {
    width: "100%",
    height: 150,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 22,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  container: {
    width: "100%",
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  card: {
    width: '85%', 
    marginBottom: 20
  },
});
export default RecipeDetailsScreen;
