import React, { useContext } from 'react';
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
  Suitability,
} from './WeatherInfoCard.sc';
import WeatherInfoContext from '../WeatherInfoContext';
import { WeatherType } from '../../../NetworkRequestService/types';

dayjs.extend(isToday);
dayjs.extend(isTomorrow);

const resolveDayText = (datetime: string) => {
  if (dayjs(datetime).isToday()) return 'Today';
  if (dayjs(datetime).isTomorrow()) return 'Tomorrow';
  return dayjs(datetime).format('dddd');
};

const resolveTempDisplay = ({
  temperature: { isDaily, min = 100, max = 100, temp = 99 },
}: WeatherType) => (isDaily ? `${min}-${max}` : temp);

const getAvgTemp = ({
  temperature: { isDaily, min = 100, max = 100, temp = 99 },
}: WeatherType) => (isDaily ? (min + max) / 2 : temp);

const Importance = ({ suitability }: { suitability: number }) => (
  <Suitability suitability={suitability}>
    Proximity to Ideal: {Math.round(suitability * 100)}%
  </Suitability>
);

const WeatherInfoCard = React.forwardRef<HTMLElement, any>(
  ({ weather }: { weather: WeatherType }, ref) => {
    const { getWeatherSuitability } = useContext(WeatherInfoContext);

    const WeatherIcon = resolveStyledWeatherIcon(weather.weather[0].icon);
    const weatherSuitability = getWeatherSuitability(weather);
    return (
      <Wrapper ref={ref} weatherSuitability={weatherSuitability}>
        <Day>{resolveDayText(weather.time)}</Day>
        <WeatherIcon temperature={getAvgTemp(weather)} />
        <Temp data-testid="weather-card-temp" temperature={getAvgTemp(weather)}>
          {resolveTempDisplay(weather)}°C
        </Temp>
        <Weather>{weather.weather.map((w) => w.main).join(', ')}</Weather>
        <TimeOfCommute>
          {dayjs(weather.time).format('HH:mm (D.M.)')}
        </TimeOfCommute>
        <Humidity>
          <WiHumidity />
          <HumidityText>{`${weather.humidity}%`}</HumidityText>
        </Humidity>
        <Importance suitability={weatherSuitability} />
      </Wrapper>
    );
  }
);

export default WeatherInfoCard;
export { resolveDayText as resolveDayTextTest };
