import React, {useState} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
const { width } = Dimensions.get("screen");
const height = (width * 100) / 150;


const images = [
  "https://images.unsplash.com/photo-1521931206836-2265cd656a5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1054&q=80",
  "https://images.unsplash.com/photo-1465808883813-7d2959af2252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  "https://images.unsplash.com/photo-1549590143-d5855148a9d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
];

const Example = () => {

const [state, setState] = useState(0)
const change = (nativeEvent) =>{
 const slide =Math.round(nativeEvent.contentOffset / nativeEvent.layout) 
 if(slide !== state){
   setState(slide)
 }

}

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        onScroll = {change}
        scrollEventThrottle={16}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        {images.map((image, index) => (
          <Image key={index} style={styles.image} source={{ uri: image }} />
        ))}
      </ScrollView>
      <View style = {styles.pagination}>
        {images.map((i, k) => (
          <Text 
          key = {i}
          style={k===state ? styles.paginationText : styles.paginationActive}> ⬤ </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width,
    height,
  },
  scroll: { width, height },
  image: {
    width,
    height,
    resizeMode: "cover",
  },
  pagination: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
     alignSelf: 'center'
    
  },
  paginationText: {
    color: "#888",
    margin: 5,

  },
  paginationActive: {
    color: "white",
    margin: 5,
  }
});

export default Example;
