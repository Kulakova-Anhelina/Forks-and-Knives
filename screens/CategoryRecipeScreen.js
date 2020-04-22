import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import {  Card} from "react-native-elements";

const CategoryRecipeScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + catId;

  const [meal, setMeal] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setMeal(responseData.meals);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Card>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate({
              routeName: "Recipe",
              //use data in new screen
              params: { recipeId: item.strMeal },
            })
          }
        >
          <View
            style={{ ...styles.container, ...{ backgroundColor: "white" } }}
          >
            <View>
              <Image
                style={styles.cardImage}
                source={{ uri: item.strMealThumb }}
              />
            </View>
            <View>
              <Text numberOfLines={2} style={styles.title}>
                {item.strMeal}
              </Text>
              <View style={styles.row}>
                <View style={styles.mealRow}>
                  <Text>{item.strArea.toUpperCase()}</Text>
                </View>
                <View style={styles.mealRow}>
                  <Text>{item.strCategory.toUpperCase()}</Text>
                </View>
                <View style={styles.mealRow}>
                  <Text>{item.strTags === null ? item.strCategory.toUpperCase() : item.strTags.toUpperCase()  }</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <ScrollView>
        <FlatList
          data={meal}
          renderItem={renderItem}
          keyExtractor={(item) => item.idMeal}
          numColumns={1}
        />
    </ScrollView>
  );
};

//dynamic function to render the title of the page
CategoryRecipeScreen.navigationOptions = (data) => {
  console.log(data);
  const catId = data.navigation.getParam("categoryId");
  return {
    headerTitle: catId,
  };
};

const styles = StyleSheet.create({
   container: {
    borderRadius: 10,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 10,
  },
  text: { 
    fontSize: 14, 
    marginBottom: 3 },

  cardImage: {
    resizeMode: "cover",
    width: 300,
    height: 100,
    alignSelf: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  
  },
  mealRow: {
    
  }
 
});
export default CategoryRecipeScreen;
