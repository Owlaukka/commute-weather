import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { WiHumidity } from 'react-icons/wi';

import {
  Wrapper,
  Day,
  WeatherIcon,
  Temp,
  Weather,
  TimeOfCommute,
  Humidity,
  HumidityText,
} from './WeatherInfoCard.sc';
import { resolveDayText } from './weatherInfoHelpers';
import { WeatherInfoContext } from './WeatherInfoContext';

const WeatherInfoCard = ({ daysIntoFuture, coords, temperature }) => {
  const weatherInfo = useContext(WeatherInfoContext);

  useEffect(() => {
    console.log(
      'make an api request here to backend with coords',
      coords?.latitude,
      coords?.longitude
    );
  }, [coords?.latitude, coords?.longitude]);

  return (
    <Wrapper>
      <Day>{resolveDayText(daysIntoFuture)}</Day>
      <WeatherIcon temperature={temperature} />
      <Temp temperature={temperature}>{temperature}°C</Temp>
      <Weather>Sunny</Weather>
      <TimeOfCommute>15:37</TimeOfCommute>
      <Humidity>
        <WiHumidity />
        <HumidityText>65%</HumidityText>
      </Humidity>
    </Wrapper>
  );
};

WeatherInfoCard.propTypes = {
  daysIntoFuture: PropTypes.number.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  temperature: PropTypes.number,
};

WeatherInfoCard.defaultProps = {
  temperature: 15,
  coords: null,
};

export default WeatherInfoCard;
