import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLogo from './assets/utils/logo';
import Fade from './fade';

interface WeatherData {
  name: string;
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sea_level: number;
  };
  sys: {
    country: string;
  };
}

function App(): JSX.Element {



  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);




  const [city, setCity, ] = useState<string>('');
  const [ sys ] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (city) {
      axios
        .get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dbe544a91d05b4b50d918889fe1e5284&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [city]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  return (
    <div className='extended-action-container'>
      <div>
        <MainLogo/>
      </div>
      <div>
        <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city name" />
      </div>
      {weather ? (
        <Fade>
        <div className='router-dom-item_count'>
          <h2>{weather.name}</h2>
          <p className='country-title'>{weather.sys.country}</p>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
        </Fade>
      ) : (
        <p>Enter a city name to see the weather</p>
      )}
      <div className='footer-inline'>Developed by  <a href="">Ramazan Azimli</a></div>
    </div>
  );
}

export default App;