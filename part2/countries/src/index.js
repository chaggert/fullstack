import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Search from "./components/Search";
import Country from "./components/Country";

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

  const showCountry = country => {
    setFilter(country.name);
  };

  const generateCountries = filter => {
    let showingCountries = countries.filter(country =>
      country.name.includes(filter)
    );

    if (showingCountries.length > 10) {
      return <p>Please start typing a country...</p>;
    } else if (showingCountries.length === 1) {
      return showingCountries.map(country => (
        <Country key={country.name} country={country} detail={true} />
      ));
    } else {
      return showingCountries.map(country => (
        <Country
          key={country.name}
          country={country}
          detail={false}
          formSubmitHandler={showCountry}
        />
      ));
    }
  };

  return (
    <div>
      <Search filter={filter} filterChangeHandler={handleFilterChange} />
      {generateCountries(filter)}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
