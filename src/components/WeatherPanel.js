import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {
  let urlWeather =
    "https://api.openweathermap.org/data/2.5/weather?appid=67cb7f565fd4ba69db48690e0e5094d1&lang=es";

  let cityUrl = "&q=";

  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?appid=67cb7f565fd4ba69db48690e0e5094d1&lang=es";

  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);

    //weather

    urlWeather = urlWeather + cityUrl + loc;

    await fetch(urlWeather)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((weatherData) => {
        console.log(weatherData);
        setWeather(weatherData);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });

    //Forecast

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((forecastData) => {
        console.log(forecastData);
        setForecast(forecastData);

        setLoading(false);
        setShow(true);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });
  };

  return (
    <>
      <Form newLocation={getLocation} />
      <Card 
      showData = {show}
      loadingData = {loading}
      weather = {weather}
      forecast = {forecast}
      />
    </>
  );
};

export default WeatherPanel;
