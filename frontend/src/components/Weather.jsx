import React from "react";
import '../index.css';

const Weather = ({item}) => (
    <div class="weather">
        <div class="title">
            <h2>Weather in Paris</h2>
        </div>

        <div className="description">
            <p>{item.weather[0].description}</p>
            <p>Weather speed : {item.wind.speed} ms/h</p>
            <p>Temperature : {item.main.temp} Celcius</p>
            <p>Feels Like : {item.main.feels_like} Celcius</p>
            <p>Pressure : {item.main.pressure}</p>
            <p>Humidity : {item.main.humidity}</p>
        </div> 
        
    </div>
    );

export default Weather;