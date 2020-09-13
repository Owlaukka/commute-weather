import React, { useContext, useEffect } from 'react';
import WeatherInfoContext from './WeatherInfoContext';
import WeatherInfoCarousel from './CardCarousel/WeatherInfoCarousel';
import useBrowserCoordinates from '../LocationGetter/useBrowserCoordinates';
import useFetchWeather from '../../NetworkRequestService/useFetchWeather';

const WeatherInfo = () => {
  const { setLocationCoords } = useContext(WeatherInfoContext);

  const coordinates = useBrowserCoordinates();
  const { loading, data } = useFetchWeather();

  useEffect(() => {
    setLocationCoords(coordinates);
  }, [coordinates, setLocationCoords]);

  if (loading) return <h1>Loading....</h1>;
  if (data?.weather) return <WeatherInfoCarousel list={data.weather} />;
  return null;
};

export default WeatherInfo;
