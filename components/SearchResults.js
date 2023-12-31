'use client';

import React from 'react';
import { useState } from 'react';

const SearchResults = ({ searches }) => {
    const [visibleResults, setVisibleResults] = useState(10);

    function process_weather_data(weather_data) {
        let data = JSON.parse(weather_data);
        
        return JSON.stringify(data['main']);
    }

    const loadMore = () => {
        setVisibleResults(visibleResults + 10);
    };

  return (
    <div>
      <h1>Searches by Users</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>City</th>
            <th>Time</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          {searches.slice(0, visibleResults).map((search, index) => (
            <tr key={index}>
              <td>{search.userId}</td>
              <td>{search.city}</td>
              <td>{search.time}</td>
              <td>{process_weather_data(search.weather)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleResults < searches.length && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default SearchResults;
