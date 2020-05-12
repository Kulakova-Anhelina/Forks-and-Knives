import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";

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

// Get a key for a new Post.

const FavoriteRecipeScreen = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("items/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const prods = Object.values(data);

        setItems(prods);
      });
  }, []);

  const deleteData = (props) => {
    firebase
      .database()
      .ref("items/")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((item) => {
          return firebase.database().ref("items").child(item.key).remove();
        });
      });
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate({
            routeName: "Recipe",
            //use data in new screen
            params: { recipeId: item.title },
          })
        }
      >
        <ListItem
          title={item.title}
          bottomDivider
          chevron={{ color: "grey" }}
        />
      </TouchableOpacity>
      <Button
        type="solid"
        buttonStyle = {{backgroundColor: Colors.accentColor , marginBottom: 10, size: ""}}
        icon={<Icon name="trash" size={20} color="white" />}
        onPress={(item) => deleteData(item)}
      />
    </View>
  );
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>My favorite recipes</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={items}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    padding: 10,
    margin: 5,
  },
  listStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingTop: 5,
  },
});

FavoriteRecipeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My recipe book",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default FavoriteRecipeScreen;
