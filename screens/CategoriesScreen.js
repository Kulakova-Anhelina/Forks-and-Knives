import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

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
            <Text>{item.strCategory}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text>What would you like?</Text>
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
  headerTitle: "Recipe categories",
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
    margin: 20,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CategoriesScreen;
