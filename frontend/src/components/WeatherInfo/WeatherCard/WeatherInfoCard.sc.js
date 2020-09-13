import styled from '@emotion/styled';
import media from 'css-in-js-media';
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiDayShowers,
  WiDayRain,
  WiDayLightning,
  WiSnow,
  WiDayFog,
  WiNightClear,
  WiNightCloudy,
  WiNightShowers,
  WiNightRain,
  WiNightLightning,
  WiNightFog,
} from 'react-icons/wi';

import { findTemperatureColor } from '../weatherInfoHelpers';

export const Wrapper = styled.article(({ theme }) => ({
  width: '100vw',
  fontSize: 'clamp(1.5rem, calc(3vw + 2.5vh), 5rem)',
  transition: 'transform 500ms',
  display: 'grid',
  justifyItems: 'center',
  alignItems: 'center',
  rowGap: '1rem',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  padding: '2rem',
  gridTemplateAreas: `"day day day day"
                      "weatherIcon weatherIcon weatherIcon weatherIcon"
                      "temp temp temp temp"
                      "weather weather weather weather"
                      "timeOfCommute timeOfCommute timeOfCommute timeOfCommute"
                      "humidity humidity humidity humidity"
                      `,
  [media('>=tablet')]: {
    height: 'min(100vh, 37rem)',
    width: 'min(100vw, 65rem)',
  },
  [media('>=desktop')]: {
    gridTemplateAreas: `"day day day day"
                        "weatherIcon weatherIcon temp weather"
                        "weatherIcon weatherIcon timeOfCommute timeOfCommute"
                        "weatherIcon weatherIcon humidity humidity"
                        `,
  },
  [media('<desktop', '>=tablet')]: {
    gridTemplateAreas: `"day day day day"
                        "weatherIcon weatherIcon temp temp"
                        "weatherIcon weatherIcon weather weather"
                        "weatherIcon weatherIcon timeOfCommute timeOfCommute"
                        "humidity humidity humidity humidity"
                        `,
  },
  backgroundColor: theme.colors.black,
  boxShadow: `0 0 15px 0px ${theme.colors.black}`,
}));

const resolveIcon = (icon) =>
  ({
    '01d': WiDaySunny,
    '02d': WiDayCloudy,
    '03d': WiCloud,
    '04d': WiCloudy,
    '09d': WiDayShowers,
    '10d': WiDayRain,
    '11d': WiDayLightning,
    '13d': WiSnow,
    '50d': WiDayFog,
    '01n': WiNightClear,
    '02n': WiNightCloudy,
    '03n': WiCloud,
    '04n': WiCloudy,
    '09n': WiNightShowers,
    '10n': WiNightRain,
    '11n': WiNightLightning,
    '13n': WiSnow,
    '50n': WiNightFog,
  }[icon] || WiCloud);

export const resolveStyledWeatherIcon = (icon) =>
  styled(resolveIcon(icon))(({ temperature }) => ({
    gridArea: 'weatherIcon',
    width: 'max(100%, 15rem)',
    height: 'max(100%, 15rem)',
    color: findTemperatureColor(temperature),
  }));

export const Day = styled.h2({
  gridArea: 'day',
  margin: 0,
});

export const Temp = styled.div(({ temperature }) => ({
  gridArea: 'temp',
  color: findTemperatureColor(temperature),
}));

export const Weather = styled.div({
  gridArea: 'weather',
});

export const TimeOfCommute = styled.div({
  fontSize: '0.8em',
  gridArea: 'timeOfCommute',
});

export const Humidity = styled.div({
  gridArea: 'humidity',
  fontSize: '0.8em',
  display: 'flex',
});

export const HumidityText = styled.div({
  marginLeft: '1rem',
});