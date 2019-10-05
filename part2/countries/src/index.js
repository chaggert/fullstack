import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const generatedCountries = filter => {
    return countries.filter(country => country.name.includes(filter));
  };

  return (
    <div>
      <Search filter={filter} filterChangeHandler={handleFilterChange} />
      <Countries genCountries={generatedCountries(filter)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
