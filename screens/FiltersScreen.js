import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FiltersScreen = (props) => {
  const { navigation } = props;

  const [isChinese, setIsChinese] = useState(false);
  const [isMeat, setMeat] = useState(false);
  const [isVegan, setVegan] = useState(false);
  const [isCanadian, setIsCanadian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      canadian: isCanadian,
      meat: isMeat,
      vegan: isVegan,
    };

    console.log(appliedFilters);
  }, [isCanadian, isMeat, isVegan]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  const FilterSwitch = (props) => {
    return (
      <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
          value={props.state}
          thumbColor={Colors.exColor}
          onValueChange={props.onChange}
          //set the switch color when it is true
          trackColor={{ true: Colors.buttonColor }}
        ></Switch>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch
        label="Meat"
        state={isMeat}
        onChange={(newValue) => setMeat(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => setVegan(newValue)}
      />
      <FilterSwitch
        label="Canadian"
        state={isCanadian}
        onChange={(newValue) => setIsCanadian(newValue)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-around",
    alignItems: "center",
    width: "90%",
    paddingVertical: 20,
  },
});

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter",
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

export default FiltersScreen;
