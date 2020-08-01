import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import { useLazyQuery, gql } from '@apollo/client';
import WeatherInfoContext from './WeatherInfoContext';

import WeatherInfoCard from './WeatherInfoCard';

const List = styled.ul({
  margin: 0,
  padding: 0,
  '& > li:not(:last-child)': {
    marginBottom: '2rem',
  },
});

const WEATHER_EXAMPLE = gql`
  query Weather($lat: Float!, $lon: Float!, $time: Time!) {
    weather(lat: $lat, lon: $lon, time: $time) {
      time
      temperature
      weather
      humidity
    }
  }
`;

const WeatherInfoCardList = ({ className }) => {
  console.log(process.env);
  const [coords, setCoords] = useState(null);
  const { commuteTime } = useContext(WeatherInfoContext);

  const [getWeather, { loading, data }] = useLazyQuery(WEATHER_EXAMPLE);

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      (position) => setCoords(position.coords),
      (error) =>
        console.error('Error Code = ' + error.code + ' - ' + error.message)
    );
  }, []);

  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      getWeather({
        variables: {
          lat: coords.latitude,
          lon: coords.longitude,
          time: commuteTime,
        },
      });
    }
  }, [coords?.latitude, coords?.longitude, commuteTime]);

  return (
    <List data-testid="weather-info-card-list" className={className}>
      {loading && <h1>Loading....</h1>}
      {!loading &&
        data?.weather &&
        data.weather.map((weather) => (
          <WeatherInfoCard key={weather.time} weather={weather} />
        ))}
    </List>
  );
};

export default WeatherInfoCardList;
