import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

const Category = (props) => {
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
      <TouchableOpacity style={styles.gridStyle} onPress={props.onSelect}>
        <View style={{ ...styles.container, ...{ backgroundColor: "white" } }}>
          <View>
            <Image
              style={{ width: 150, height: 100 }}
              source={{ uri: item.strCategoryThumb }}
            />
          </View>
          <View>
            <Text numberOfLines={2} style={{ fontSize: 12 }}>
              {item.strCategory}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={category}
      renderItem={renderItem}
      keyExtractor={(item) => item.idCategory}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
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
  text: { fontSize: 10 },
});
export default Category;
