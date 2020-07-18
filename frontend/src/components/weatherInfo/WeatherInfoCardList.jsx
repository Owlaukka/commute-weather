import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLazyQuery, gql } from '@apollo/client';

import WeatherInfoCard from './WeatherInfoCard';

const List = styled.ul({
  width: 'min(100vw, 45rem)',
  margin: '0 auto',
  padding: '1rem',
  '& > li:not(:last-child)': {
    marginBottom: '3rem',
  },
});

// TODO: 17:30 didn't work. probably have to change one side of the comparison to inclusive
const WEATHER_EXAMPLE = gql`
  query Weather($lat: Float!, $lon: Float!, $times: [Datetime!]!) {
    weather(lat: $lat, lon: $lon, times: $times) {
      time
      temperature
      weather
      humidity
    }
  }
`;

const TIME_EXAMPLES = ['2020-07-18T17:30:00'];

const WeatherInfoCardList = () => {
  const [coords, setCoords] = useState(null);

  const [getWeather, { loading, data }] = useLazyQuery(WEATHER_EXAMPLE);

  console.log('loading', loading);
  console.log('data', data);

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
          times: TIME_EXAMPLES,
        },
      });
    }
  }, [coords?.latitude, coords?.longitude]);

  return (
    <List>
      {!loading &&
        data?.weather &&
        data.weather.map((weather, i) => (
          <WeatherInfoCard
            key={weather.time}
            weather={weather}
            requestedTime={TIME_EXAMPLES[i]}
          />
        ))}
    </List>
  );
};

export default WeatherInfoCardList;
