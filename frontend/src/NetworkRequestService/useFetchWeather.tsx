import { useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { useLazyQuery } from '@apollo/client';
import WeatherInfoContext from '../components/WeatherInfo/WeatherInfoContext';
import { WEATHER_QUERY } from './Queries';
import { formatTime } from '../components/WeatherInfo/weatherInfoHelpers';

dayjs.extend(utc);
const timeZoneDifference = dayjs().hour() - dayjs.utc().hour();

// TODO: maybe accept parameters to determine
// which fields from the query are desired
const useFetchWeather = () => {
  const {
    commuteTime,
    locationCoords: { latitude, longitude },
  } = useContext(WeatherInfoContext);
  const [getWeather, { loading, data }] = useLazyQuery(WEATHER_QUERY);

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

  return { loading, data } as const;
};

export default useFetchWeather;
