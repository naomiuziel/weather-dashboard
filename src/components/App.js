import { useEffect, useState } from "react";
import ControlBar from "./ControlBar";
import WeatherCards from "./WeatherCards";
import axios from "axios";

const openWeatherMapApiKey = 'YOUR API KEY HERE';

function App() {
  const getCitiesFromLocalStorage = () => {
    const defaultCityNames = localStorage.getItem('cityNames');

    if (!defaultCityNames) {
      return [];
    }

    return JSON.parse(defaultCityNames).map((cityName) => {
      return {
        input: cityName,
        isLoading: true,
        weatherData: undefined,
      };
    });
  };

  const [cities, setCities] = useState(getCitiesFromLocalStorage());

  useEffect(() => {
    // fetch weather data when new city is added
    cities.forEach((city) => {
      if (city.weatherData === undefined) {
        loadWeatherData(city.input);
      }
    });

    // maintain local storage list of cities
    updateLocalStorage();
  }, [cities]);

  const updateLocalStorage = () => {
    const cityNames = cities.map((city) => {
      return city.input;
    });

    const cityNamesJson = JSON.stringify(cityNames);

    localStorage.setItem('cityNames', cityNamesJson);
  }

  const loadWeatherData = (city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${openWeatherMapApiKey}`)
      .then((response) => {
        updateWeatherData(city, response.data);
      }).catch(() => {
        removeCity(city);
        alert('That city could not be found');
      });
  }

  const updateWeatherData = (cityToUpdate, weatherData) => {
    setCities(cities.map((city) => {
      if (city.input === cityToUpdate) {
        city.weatherData = weatherData;
        city.isLoading = false;
      }

      return city;
    }));
  }

  const addCity = (city) => {
    setCities([
      {
        input: city,
        isLoading: true,
        weatherData: undefined
      },
      ...cities
    ]);
  }

  const removeCity = (cityToRemove) => {
    setCities(cities.filter((city) => {
      return city.input !== cityToRemove;
    }));
  }

  const cityExists = (cityToFind) => {
    return !!cities.find((city) => {
      return city.input === cityToFind;
    });
  }

  return (
    <div className="container py-5">
      <h1 className="h2 mb-3 text-light">Weather dashboard</h1>
      
      <ControlBar addCity={addCity} cityExists={cityExists} />

      <WeatherCards cities={cities} removeCity={removeCity}/>
    </div>
  );
}

export default App;
