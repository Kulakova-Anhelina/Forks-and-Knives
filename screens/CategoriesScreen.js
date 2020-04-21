import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Food from "../components/Food";
import Example from "../components/SliderCarusel";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";

const CategoriesScreen = (props) => {
  console.log(props);
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const [category, setCategory] = useState("");
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setCategory(responseData.categories);
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
            params: { categoryId: item.strCategory },
          })
        }
      >
        <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
          <View>
            <Image
              style={{ width: 150, height: 100 }}
              source={{ uri: item.strCategoryThumb }}
            />
          </View>
          <View>
            <Text numberOfLines={2} style={{ fontSize: 15 }}>
              {item.strCategory}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.title}>WHAT WOULD YOU LIKE TO COOK ?</Text>

        <View>
          <Image
            style={{ width: 350, height: 150 }}
            source={require("../images/10-Kitchen-Ingredients-That-Work-Like-Medicines.jpg")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ ...styles.input, ...{ fontSize: 20 } }}
            onChangeText={(text) => setSearchItem(text)}
            value={searchItem}
            placeholder="Search"
          />
          <Button
            title="GO"
            type="outline"
            buttonStyle={{ borderColor: Colors.buttonColor }}
            titleStyle={{ color: Colors.buttonColor }}
            onPress={() =>
              props.navigation.navigate({
                routeName: "CategoryRecipe",
                //use data in new screen
                params: { categoryId: searchItem },
              })
            }
          />
        </View>
        <Text style={styles.title}>INSPIRATION JUST FOR YOU</Text>
        <Food />

        <View>
          <View>
            <Example />
          </View>
        </View>
        <Text style={styles.title}> FEATURED COLLECTION</Text>
        <FlatList
          data={category}
          renderItem={renderItem}
          keyExtractor={(item) => item.idCategory}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: "Forks and Knives",
  // headerStyle: {
  //   backgroundColor: Colors.backColor
  // },
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  gridStyle: {
    margin: 10,
    height: 150,
    width: 150,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
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
    margin: 5,
  },
  text: { fontSize: 15 },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "space-around",
    alignItems: "center",
  },
  input: {
    height: 45,
    borderColor: Colors.backColor,
    borderWidth: 1,
    width: 280,
    margin: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    fontSize: 12,
  },
});
export default CategoriesScreen;
