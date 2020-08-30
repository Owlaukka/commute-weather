import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery, gql } from '@apollo/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import WeatherInfoContext from './WeatherInfoContext';
import { formatTime } from './weatherInfoHelpers';

dayjs.extend(utc);

// TODO: move elsewhere and create a sensible handler for API-calls in general
const WEATHER_EXAMPLE = gql`
  query Weather(
    $lat: Float!
    $lon: Float!
    $time: Time!
    $requestedAt: String!
  ) {
    weather(lat: $lat, lon: $lon, time: $time, requestedAt: $requestedAt) {
      time
      temperature {
        isDaily
        temp
        min
        max
      }
      weather {
        main
        icon
      }
      humidity
    }
  }
`;

const timeZoneDifference = dayjs().hour() - dayjs.utc().hour();

const WeatherFetcher = ({ children }) => {
  const [{ latitude, longitude }, setCoords] = useState({});
  const { commuteTime } = useContext(WeatherInfoContext);

  const [getWeather, { loading, data }] = useLazyQuery(WEATHER_EXAMPLE);

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      (position) => setCoords(position.coords),
      // eslint-disable-next-line no-console
      (error) => console.error(`Error Code = ${error.code} - ${error.message}`)
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const [hour, minute] = commuteTime;
      const today = dayjs();
      getWeather({
        variables: {
          lat: latitude,
          lon: longitude,
          time: formatTime((hour - timeZoneDifference + 24) % 24, minute),
          // TODO: used only for cache-busting. Find a better way to invalidate cache on the client
          // that doesn't involve sending a pointless timestamp to the server.
          requestedAt:
            today.hour() > hour
              ? today.add(1, 'day').format('YYYY-MM-DD')
              : today.format('YYYY-MM-DD'),
        },
      });
    }
  }, [latitude, longitude, commuteTime, getWeather]);

  if (loading) return <h1 style={{ height: '100vh' }}>Loading....</h1>;
  if (!loading && data?.weather) return children(data.weather || []);
  return <h1>Shit</h1>;
};

WeatherFetcher.propTypes = {
  children: PropTypes.func.isRequired,
};

export default WeatherFetcher;
