import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CategoryGrid = (props) => {
  return (
    <TouchableOpacity
      style={styles.gridStyle}
      onPress={() =>
        props.navigation.navigate({
          routeName: "CategoryRecipe",
          //use data in new screen
          params: { categoryId: props.item.strCategory },
        })
      }
    >
      <View>
        <View>
          <Image
            style={{ width: 150, height: 100 }}
            source={{ uri: props.item.strCategoryThumb }}
          />
        </View>
        <View>
          <Text>{props.item.strCategory}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
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
export default CategoryGrid;
