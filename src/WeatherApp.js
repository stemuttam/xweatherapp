import React, { useState } from "react";
import "./WeatherApp.css"; // Import the CSS for styling

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_KEY = "8cb5ca6ce9354217b6562302252102"; // 🔥 Replace with your actual WeatherAPI key

    const fetchWeather = async () => {
        if (!city) {
            alert("Please enter a city name");
            return;
        }

        setLoading(true);
        setWeather(null); // Reset weather data before fetching

        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
            );

            if (!response.ok) {
                throw new Error("Invalid city name");
            }

            const data = await response.json();
            setWeather(data);
        } catch (error) {
            alert("Failed to fetch weather data"); // ✅ Matches Cypress test case
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-container">
            <h2>Weather App</h2>
            <div className="search-box">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                />
                <button onClick={fetchWeather}>Search</button>
            </div>

            {loading && <p>Loading data...</p>} {/* ✅ Matches Cypress test */}

            {weather && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <h3>Temperature</h3>
                        <p>{weather.current.temp_c}°C</p>
                    </div>
                    <div className="weather-card">
                        <h3>Humidity</h3>
                        <p>{weather.current.humidity}%</p>
                    </div>
                    <div className="weather-card">
                        <h3>Condition</h3>
                        <p>{weather.current.condition.text}</p>
                    </div>
                    <div className="weather-card">
                        <h3>Wind Speed</h3>
                        <p>{weather.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
