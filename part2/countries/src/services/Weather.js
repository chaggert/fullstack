import React, { useState, useEffect } from "react";
import axios from "axios";
import WEATHER_API_KEY from "../keys";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    weatherIcon: null,
    windSpeed: null,
    windDirection: null
  });

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${city}`
      )
      .then(response => {
        setWeatherData({
          temperature: response.data.current.temperature,
          weatherIcon: response.data.current.weather_icons[0],
          windSpeed: response.data.current.wind_speed,
          windDirection: response.data.current.wind_dir
        });
      });
  }, [city]);

  return (
    <div>
      <h3>Weather</h3>
      <p>Temperature: {weatherData.temperature} degrees Celsius</p>
      <img alt="" src={weatherData.weatherIcon} />
      <p>
        Wind: {weatherData.windSpeed} kph {weatherData.windDirection}
      </p>
    </div>
  );
};

export default Weather;
