import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

const SearchRecipe = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

const fetchData = () =>{
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + search)
.then(response=> response.json())
.then(responseData =>{
  setState(responseData.meals)
} )
}


  return (
    <SearchBar
      placeholder="Searh recipe"
      onChangeText={updateSearch}
      value={search}
      platform="ios"
          />
  );
};

export default SearchRecipe;
