'use client';

import styles from './page.module.css'
import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import AuthCheck from '../components/AuthCheck';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    try {
        const parsedQuery = JSON.parse(lastQuery);
      if (parsedQuery) {
        setWeatherData(parsedQuery);
      }
    } catch (e) {
      console.log('error parsing last query', e);
    }
  }, []);

  const storeSearch = async (city, res_data) => {
    const weatherString = JSON.stringify(res_data);

    const body = {
      'city': city,
      'currentTime': res_data.dt,
      'weatherString': weatherString,
    };

    const res_post = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res_post;
  };

  const handleSearchClick = async (city) => {   
    if (!city) return;
    
    let res = await fetch(`/api/getweather/${city}`, {
      method: 'GET',
      next: { revalidate: 1200 },
    }
    );
    let res_data = await res.json();

    setWeatherData(res_data);

    const res_post_data = await storeSearch(city, res_data);

    localStorage.setItem('lastQuery', JSON.stringify(res_data));
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
        
        <AuthCheck>
          <button 
            onClick={() => handleSearchClick(city)}
          >Search</button>
          {/* TODO: if user is not signed out, display log in message */}
          {weatherData && <WeatherCard weatherData={weatherData}/>}
        </AuthCheck>
      
      </div>
    </main>
  )
}
