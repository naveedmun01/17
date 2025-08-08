import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

export default function App() {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('New York');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=40.71&lon=-74.01&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`);
        setWeather(res.data);
      } catch (err) {
        console.error('Error fetching weather data', err);
      }
    };
    fetchData();
  }, [city]);

  return (
    <div className="app">
      <h1>WeatherNow - {city}</h1>
      {weather ? (
        <>
          <h2>Current: {weather.current.temp}°C</h2>
          <h3>UV Index: {weather.current.uvi}</h3>
          <h3>Air Quality: Placeholder</h3>
          <h4>7-Day Forecast:</h4>
          <ul>
            {weather.daily.slice(0, 7).map((day: any, index: number) => (
              <li key={index}>{new Date(day.dt * 1000).toDateString()}: {day.temp.day}°C</li>
            ))}
          </ul>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
}