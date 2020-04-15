import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Food = (props) => {
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
      <TouchableOpacity style={styles.gridStyle}>
  
        <View style={styles.container}>
          <View>
            <Image
              style={{ width: 150, height: 100 }}
              source={{ uri: item.strMealThumb }}
            />
          </View>
          <View>
            <Text numberOfLines={2} style={{ fontSize: 10 }}>
              {item.strMeal}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.gridStyle}>
      <FlatList
        data={category}
        renderItem={renderItem}
        keyExtractor={(item) => item.idMeal}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gridStyle: {
    margin: 10,
    height: 150,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,

  },
  container: {
    flex: 1,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  text: { fontSize: 2 },
});
export default Food;
