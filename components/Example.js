import React from 'react';
import {
  StyleSheet,
  View,
  AppRegistry,
  Image,
  Dimensions,
} from 'react-native';


const { width } = Dimensions.get("screen");
const height = (width * 100) / 150;
import Carousel from 'react-native-carousel-view';

export default function Example() {

 
    return (
  
        <View style={styles.container}>
          <Carousel
            width={width}
            height={height}
            delay={4000}
            indicatorSize={20}
            indicatorColor="white"
            >
            <View style={styles.contentContainer}>
             <Image style={styles.image} source={{uri: "https://images.unsplash.com/photo-1521931206836-2265cd656a5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1054&q=80"} }/>
            </View>
            <View style={styles.contentContainer}>
            <Image style={styles.image} source={{uri: "https://images.unsplash.com/photo-1465808883813-7d2959af2252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"} }/>
            </View>
            <View style={styles.contentContainer}>
            <Image style={styles.image} source={{uri: "https://images.unsplash.com/photo-1549590143-d5855148a9d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"} }/>
            </View>
          </Carousel>
        </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width,
    height,
    resizeMode: "cover",
  }
});


AppRegistry.registerComponent('example', () => example)