import React, { useState } from 'react';
import './App.css';

const API_KEY = 'demo'; // Replace with your OpenWeatherMap API key for real use

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather} disabled={loading || !city}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weather && (
          <div style={{ marginTop: 20 }}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
