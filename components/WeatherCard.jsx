import styles from './WeatherCard.module.css';

export default function WeatherCard({weatherData}) {
    let currentTime = new Date(weatherData?.dt * 1000);
    
    return (
      <div className={styles.weathercard}>
        <a href="#" >
              <h3>{weatherData?.name}</h3>
              <p>Time: {currentTime.toLocaleString()}</p>
              <p>Temperature (°C): {weatherData?.main?.temp || ''}</p>
              <p>Feels like: {weatherData?.main?.feels_like || ''}</p>
              <p>Humidity: {weatherData?.main?.humidity || ''}</p>
        </a>
      </div>
    )
  }
