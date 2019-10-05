import React from "react";

const Country = ({ country, detail, formSubmitHandler }) => {
  const languages = langs => {
    return langs.map(language => <li key={language.name}>{language.name}</li>);
  };

  return detail === false ? (
    <div>
      <p>
        {country.name}{" "}
        <button type="button" onClick={() => formSubmitHandler(country)}>
          show details
        </button>
      </p>
    </div>
  ) : (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>
        Languages Spoken:
        {languages(country.languages)}
      </p>
      <img alt="" src={country.flag} />
    </div>
  );
};

export default Country;
