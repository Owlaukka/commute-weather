import React, { useContext, useEffect } from 'react';
import WeatherInfoContext from './WeatherInfoContext';
import WeatherInfoCarousel from './CardCarousel/WeatherInfoCarousel';
import useBrowserCoordinates from '../LocationGetter/useBrowserCoordinates';
import useFetchWeather from '../../NetworkRequestService/useFetchWeather';

type WeatherInfoProps = {
  toggleFormVisible: (arg: boolean | ((prev: boolean) => boolean)) => void;
};

const WeatherInfo = ({ toggleFormVisible }: WeatherInfoProps) => {
  const { setLocationCoords } = useContext(WeatherInfoContext);

  const coordinates = useBrowserCoordinates();
  const { loading, data } = useFetchWeather();

  useEffect(() => {
    setLocationCoords(coordinates);
  }, [coordinates, setLocationCoords]);

  if (loading) return <h1>Loading....</h1>;
  if (data?.weather)
    return (
      <WeatherInfoCarousel
        toggleFormVisible={toggleFormVisible}
        list={data.weather}
      />
    );
  return null;
};

export default WeatherInfo;
