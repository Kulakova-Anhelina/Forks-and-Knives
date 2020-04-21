import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Button, Card, Icon } from "react-native-elements";

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
              <View style={styles.mealRow}>
                <Text>{item.strArea}</Text>
              </View>
              <View style={styles.mealRow}>
                <Text>{item.strCategory}</Text>
              </View>
            </View>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="VIEW NOW"
            />
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>LEARN TO COOK</Text>
        <FlatList
          data={meal}
          renderItem={renderItem}
          keyExtractor={(item) => item.idMeal}
          numColumns={1}
        />
      </View>
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
  },
  text: { fontSize: 14, marginBottom: 10 },
  cardImage: {
    resizeMode: "cover",
    width: 300,
    height: 100,
  },

 
});
export default CategoryRecipeScreen;
