import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import * as firebase from "firebase";



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
  firebase.initializeApp(config);
}

const FavoriteRecipeScreen = (props) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    firebase.database().ref("items/").on("value", (snapshot) => {
        const data = snapshot.val();
        const prods = Object.values(data);
        setItems(prods);
      });
  }, []);

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%",
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={{ marginTop: 30, fontSize: 20 }}>My favorite recipes</Text>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </View>
        )}
        data={items}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
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
