import React from 'react';
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

const WeatherInfoCard = ({ daysIntoFuture, temperature }) => (
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

WeatherInfoCard.propTypes = {
  daysIntoFuture: PropTypes.number.isRequired,
  temperature: PropTypes.number,
};

WeatherInfoCard.defaultProps = {
  temperature: 15,
};

export default WeatherInfoCard;
