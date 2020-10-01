import React from 'react';
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

const resolveDayText = (datetime: string) => {
  if (dayjs(datetime).isToday()) return 'Today';
  if (dayjs(datetime).isTomorrow()) return 'Tomorrow';
  return dayjs(datetime).format('dddd');
};

type WeatherIconType = {
  main: string;
  icon: string;
};

export type WeatherResponseType = {
  temperature: { isDaily: boolean; min?: number; max?: number; temp?: number };
  weather: WeatherIconType[];
  time: string;
  humidity: number;
};

const resolveTempDisplay = ({
  temperature: { isDaily, min = 100, max = 100, temp = 99 },
}: WeatherResponseType) => (isDaily ? `${min}-${max}` : temp);

const getAvgTemp = ({
  temperature: { isDaily, min = 100, max = 100, temp = 99 },
}: WeatherResponseType) => (isDaily ? (min + max) / 2 : temp);

const WeatherInfoCard = React.forwardRef<HTMLElement, any>(
  ({ weather }: { weather: WeatherResponseType }, ref) => {
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
  }
);

export default WeatherInfoCard;
export { resolveDayText as resolveDayTextTest };
