const WeatherCard = ({ city, removeCity }) => {
  const onClickRemove = (event) => {
    event.preventDefault();

    if (window.confirm('Are you sure you want to delete this city?')) {
      removeCity(city.input);
    }
  }

  const kelvinToCelcius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
  }

  const mpsToMph = (mps) => {
    return Math.round(mps * 2.237);
  }

  const unixToTime = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{!city.isLoading ? city.weatherData.name : city.input}</h5>

        {city.isLoading && (
          <>
            <p>Data is loading, please wait...</p>
          </>
        )}

        {!city.isLoading && (
          <>
            <div className="position-absolute top-0 end-0" style={{ marginTop: '10px', marginRight: '10px' }}>
              <a href="#" onClick={onClickRemove} className="link-secondary">
                <i className="fa-solid fa-trash" />
              </a>
            </div>

            <h6 className="card-subtitle mb-2 text-muted">{city.weatherData.weather[0].description}</h6>

            <h5>
              {kelvinToCelcius(city.weatherData.main.temp)}&#8451; &nbsp;

              <small className="text-muted h6">
                (Feels like {kelvinToCelcius(city.weatherData.main.feels_like)}&#8451;)
              </small>
            </h5>

            <h6>
              <small className="text-muted">
                {kelvinToCelcius(city.weatherData.main.temp_max)}&#8451;
                &nbsp;/&nbsp;
                {kelvinToCelcius(city.weatherData.main.temp_min)}&#8451;
              </small>
            </h6>
          </>
        )}
      </div>

      {!city.isLoading && (
        <div className="card-footer">
          <ul className="list-inline mb-0 d-flex justify-content-between">
            <li className="list-inline-item" title="Humidity">
              <i className="fa-solid fa-water" /> &nbsp;
              {city.weatherData.main.humidity}%
            </li>

            <li className="list-inline-item" title="Wind speed">
              <i className="fa-solid fa-wind" /> &nbsp;
              {mpsToMph(city.weatherData.wind.speed)}mph
            </li>

            <li className="list-inline-item" title="Sunrise">
              <i className="fa-solid fa-sun" /> &nbsp;
              {unixToTime(city.weatherData.sys.sunrise + city.weatherData.timezone)} 
            </li>

            <li className="list-inline-item" title="Sunset">
              <i className="fa-solid fa-moon" /> &nbsp;
              {unixToTime(city.weatherData.sys.sunset + city.weatherData.timezone)} 
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
