import React, { useState} from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get('window');

const  Example =() =>  {

const [size, setSize] = useState({
  width: width,
  hight: height
})

 const onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    setSize({ size: { width: layout.width, height: layout.height } });
  }

    return (
      <View style={{ flex: 1 }} onLayout={onLayoutDidChange}>
        <Carousel
          delay={2000}
          style={}
          autoplay
          pageInfo
          onAnimateNextPage={(p) => console.log(p)}
        >
          <View style={[{ backgroundColor: '#BADA55' , width = {size.width}}]}><Text>1</Text></View>
          <View style={[{ backgroundColor: 'red' },] }><Text>2</Text></View>
          <View style={[{ backgroundColor: 'blue' }, ]}><Text>3</Text></View>
        </Carousel>
      </View>
    );
  }
export default Example;