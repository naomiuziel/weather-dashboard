import WeatherCard from './WeatherCard';

const WeatherCards = ({ cities, removeCity }) => {
    return (
        <div className="row">
            {cities.map((city) => (
                <div className="col-4" key={city.input}>
                    <WeatherCard city={city} removeCity={removeCity} />
                </div>
            ))}
        </div>
    )
}

export default WeatherCards;