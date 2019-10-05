import React from "react";
import Country from "./Country";

const Countries = ({ genCountries }) => {
  const countryList = () => {
    return genCountries.map(country => (
      <p key={country.name}>{country.name}</p>
    ));
  };

  const countryDetails = () => {
    return genCountries.map(country => (
      <Country key={country.name} country={country} />
    ));
  };

  //Returns either a list of country names or one country with its details, dependending on the user-entered filter criteria
  const countriesOrCountryDetails = countries => {
    if (countries.length > 10) {
      return (
        <p>Too many countries match this filter. Please further specify.</p>
      );
    } else if (countries.length === 1) {
      return countryDetails();
    } else {
      return countryList();
    }
  };

  return <div>{countriesOrCountryDetails(genCountries)}</div>;
};

export default Countries;
