import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
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

const WeatherInfoCard = ({ weather }) => (
  <Wrapper>
    {/* TODO: change resolve to resolve given datetime */}
    <Day>{resolveDayText(weather.time)}</Day>
    <WeatherIcon temperature={weather.temperature} />
    <Temp temperature={weather.temperature}>{weather.temperature}°C</Temp>
    <Weather>{weather.weather.join(', ')}</Weather>
    <TimeOfCommute>{dayjs(weather.time).format('HH:mm')}</TimeOfCommute>
    <Humidity>
      <WiHumidity />
      <HumidityText>{weather.humidity}%</HumidityText>
    </Humidity>
  </Wrapper>
);

WeatherInfoCard.propTypes = {
  weather: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
  }).isRequired,
  requestedTime: PropTypes.string.isRequired,
};

export default WeatherInfoCard;
