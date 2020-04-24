import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Button } from 'react-native-elements';
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const deleteData = () => {

    firebase.database().ref(`items/${id}`).remove();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
    <ListItem
      title={item.title}
      bottomDivider
      rightIcon={<Ionicons name="ios-close" size={25} />}
      onPress = {(id) => deleteData(id)}

    />
    </TouchableOpacity>
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
    justifyContent: "center",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    padding: 10,
    margin: 5,
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
