import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import { WiHumidity } from 'react-icons/wi';

import {
  Wrapper,
  Day,
  Temp,
  Weather,
  TimeOfCommute,
  Humidity,
  HumidityText,
  resolveStyledWeatherIcon,
} from './WeatherInfoCard.sc';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const resolveDayText = (datetime) => {
  if (dayjs(datetime).isToday()) return 'Today';
  if (dayjs(datetime).isTomorrow()) return 'Tomorrow';
  return dayjs(datetime).format('dddd');
};

const resolveTempDisplay = (weather) =>
  weather.temperature.isDaily
    ? `${weather.temperature.min}-${weather.temperature.max}`
    : weather.temperature.temp;

const getAvgTemp = (weather) =>
  weather.temperature.isDaily
    ? (weather.temperature.min + weather.temperature.max) / 2
    : weather.temperature.temp;

const WeatherInfoCard = React.forwardRef(({ weather }, ref) => {
  const WeatherIcon = resolveStyledWeatherIcon(weather.weather[0].icon);
  return (
    <Wrapper ref={ref}>
      <Day>{resolveDayText(weather.time)}</Day>
      <WeatherIcon temperature={getAvgTemp(weather)} />
      <Temp data-testid="weather-card-temp" temperature={getAvgTemp(weather)}>
        {`${resolveTempDisplay(weather)}°C`}
      </Temp>
      <Weather>{weather.weather.map((w) => w.main).join(', ')}</Weather>
      <TimeOfCommute>
        {dayjs(weather.time).format('HH:mm (D.M.)')}
      </TimeOfCommute>
      <Humidity>
        <WiHumidity />
        <HumidityText>{`${weather.humidity}%`}</HumidityText>
      </Humidity>
    </Wrapper>
  );
});

WeatherInfoCard.propTypes = {
  weather: PropTypes.shape({
    temperature: PropTypes.shape({
      isDaily: PropTypes.bool.isRequired,
      temp: PropTypes.number,
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    time: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherInfoCard;
export { resolveDayText as resolveDayTextTest };
