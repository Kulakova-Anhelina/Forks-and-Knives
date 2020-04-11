import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const CategoriesScreen = (props) => {
  console.log(props);
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const [category, setCategory] = useState("");

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
            params: {
              categoryId: category.item.idCategory,
            },
          })
        }
      >
        <View>
          <View>
            <Image
              style={{ width: 150, height: 100 }}
              source={{ uri: item.strCategoryThumb }}
            />
          </View>
          <View>
            <Text>{item.strCategory}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Text>What would you like?</Text>
      <FlatList
        data={category}
        renderItem={renderItem}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
      />
    </View>
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: "Recipe categories",
  // headerStyle: {
  //   backgroundColor: Colors.backColor
  // },
  headerTintColor: Colors.buttonColor,
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  gridStyle: {
    margin: 20,
    height: 150,
  },
});
export default CategoriesScreen;
