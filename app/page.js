'use client';

import styles from './page.module.css'
import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    handleSearch(lastQuery);
  }, []);

  const storeSearch = async (city, res_data) => {
    console.log('storeSearch res_data input:', res_data);
    const currentTime = new Date(res_data.dt * 1000).toLocaleString();
    const weatherString = JSON.stringify(res_data);
    console.log('currentTime', currentTime);

    const body = {
      'city': city,
      'currentTime': currentTime,
      'weatherString': weatherString,
    };
    console.log('body', body);

    const res_post = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res_post;
  };

  const getSearches = async () => {
    const userSearches = await fetch('/api/search', {
      method: 'GET',
    }).then((res) => res.json());
    console.log('userSearches', userSearches);

    return userSearches;
  }

  const handleSearch = async (city) => {
    let res = await fetch(`/api/getweather/${city}`, {
      method: 'GET',
    }
    );
    let res_data = await res.json();
    console.log('res_data_api', res_data);

    setWeatherData(res_data);

    const res_post_data = await storeSearch(city, res_data);

    localStorage.setItem('lastQuery', city);

    const userSearches = await fetch('/api/search', {
      method: 'GET',
    }).then((res) => res.json());
    console.log('userSearches', userSearches);

    return userSearches
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}> Amazing Weather App </h1>
      
      <div>
        <input 
          type="text" 
          placeholder="Enter city name" 
          onChange={(e) => setCity(e.target.value)}
        />
        
          <button 
            onClick={() => handleSearch(city)}
          >Search</button>
          {weatherData && <WeatherCard weatherData={weatherData}/>}
      
      <h1 className={styles.title}> Previous Searches </h1>
      {}
      
      </div>
    </main>
  )
}
