import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function App() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [description, setDescription] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function showWeather(response) {
    setWeather(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setDescription(response.data.weather[0].description);
    setWind(response.data.wind.speed);
    setIcon({
      Icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setLoaded(true);
  }

  function changeForm(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c4a9939725ba31c649f920f1619c911&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let Form = (
    <div className="form">
      <h1 className="title">Weather App</h1>
      <form onSubmit={changeForm}>
        <input
          className="input m-2 rounded p-2"
          type="search"
          placeholder="search for a city ..."
          onChange={updateCity}
        />
        <input className="submitbtn rounded p-2" type="submit" value="search" />
      </form>
    </div>
  );
  if (loaded) {
    return (
      <div className="App">
        {Form}
        <ul className="list">
          <li className="city">{city}</li>
          <li>Tempreature: {Math.round(weather)} C°</li>
          <li>Description: {description} </li>
          <li>Humidity: {Math.round(humidity)}%</li>
          <li>Wind:{Math.round(wind)} KM/H </li>
          <img src={icon.Icon} alt={setDescription.description} />
        </ul>
      </div>
    );
  } else {
    return Form;
  }
}
