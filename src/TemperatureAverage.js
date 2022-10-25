import React, { useContext } from "react";
import { WeatherContext } from "./App";

const TemperatureAverage = (props) => {
  const context = useContext(WeatherContext);

  if (context.cities.length === 0) {
    return <div>Add some cities to view their temperature.</div>;
  }

  let total = 0;
  for (const city of context.cities) {
    total += city.temperature;
  }
  const avg = total / context.cities.length;

  return (
    <div>
      The average is <b>{avg.toFixed(2)}</b> degrees fahrenheit.
    </div>
  );
};

export default TemperatureAverage;
