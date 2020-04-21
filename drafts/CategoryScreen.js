import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import SearchRecipe from "../components/SearchRecipe";
import FoodScreen from "../drafts/Food"

const CategoriesScreen = (props) => {
  console.log(props);
  const url = "https://www.themealdb.com/api/json/v2/9973533/latest.php";
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setCategory(responseData.meals);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.gridStyle}
        onPress={() =>
          props.navigation.navigate({
            routeName: "CategoryRecipe",
            //use data in new screen
            params: { categoryId: item.strMeal },
          })
        }
      >
        <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
          <View>
            <Image
              style={{ width: 150, height: 100 }}
              source={{ uri: item.strMealThumb }}
            />
          </View>
          <View >
            <Text numberOfLines={2} style = {{fontSize: 10}}>{item.strMeal}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>What would you like to cook ?</Text>
        <SearchRecipe />
        <View>
            <Image
              style={{ width: 350, height: 150}}
              source={require('../images/10-Kitchen-Ingredients-That-Work-Like-Medicines.jpg')}
            />
          
          </View>
        <View>
        <Text style = {styles.title}>10 LATEST RECIPES</Text>
        </View>
        <FlatList
          data={category}
          renderItem={renderItem}
          keyExtractor={(item) => item.idMeal}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        />
        <Text text = {styles.title}>LEARN TO COOK</Text>
        <FoodScreen/>
      </View>
    </ScrollView>
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: "Recipe categories",
  // headerStyle: {
  //   backgroundColor: Colors.backColor
  // },
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  gridStyle: {
    margin: 10,
    height: 150,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    alignContent: "space-between",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    padding: 10,
  },
  text: {fontSize: 2},
});
export default CategoriesScreen;
