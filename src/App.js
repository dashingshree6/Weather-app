import React, { createContext, useState, useEffect } from "react";
import "./styles.css";
import CityList from "./CityList";
import AddCityButton from "./AddCityButton";
import TemperatureAverage from "./TemperatureAverage";

export const WeatherContext = createContext({
  cities: [],
  addCity: (name, temperature) => {}
});

export default function App() {
  const [cities, setCities] = useState([]);
  const [time, setTime] = useState("");

  const addCity = (name, temperature) => {
    const newCity = { name, temperature };
    setCities((prevState) => {
      return [...prevState, { name, temperature }];
    });
  };

  useEffect(() => {
    let time = setTimeout(() => {
      fetch(
        "https://api.open-meteo.com/v1/dwd-icon?latitude=28.6353&longitude=77.2250&hourly=temperature_2m"
      )
        .then((res) => res.json())
        .then((res) => setTime(res.generationtime_ms))
        .catch((err) => console.log(err));
    }, 1000);
    // return clearTimeout(time)
  }, [time]);

  return (
    <WeatherContext.Provider
      value={{
        cities,
        addCity
      }}
    >
      <div className="city-overview">
        <h1>Weather App</h1>
        <h3>Generation Time : {time} milli seconds</h3>
        <CityList />
        <AddCityButton />
        <TemperatureAverage />
      </div>
    </WeatherContext.Provider>
  );
}
