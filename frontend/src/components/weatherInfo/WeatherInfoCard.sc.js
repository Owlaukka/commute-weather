import styled from '@emotion/styled';
import media from 'css-in-js-media';
import { WiDaySunny } from 'react-icons/wi';

import { findTemperatureColor } from './weatherInfoHelpers';

export const Wrapper = styled.li(
  {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    [media('>=desktop')]: {
      gridTemplateRows: 'auto repeat(3, 1fr)',
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
                          "humidity humidity humidity humidity "
                          `,
      justifyItems: 'center',
      gap: '1rem',
      paddingBottom: '1rem',
    },
    [media('<tablet')]: {
      gridTemplateAreas: `"day day day day"
                          "weatherIcon weatherIcon weatherIcon weatherIcon"
                          "temp temp temp temp"
                          "weather weather weather weather "
                          "timeOfCommute timeOfCommute timeOfCommute timeOfCommute "
                          "humidity humidity humidity humidity "
                          `,
      justifyItems: 'center',
      gap: '1rem',
      paddingBottom: '1rem',
    },
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.black,
    boxShadow: `0 0 15px 0px ${theme.colors.black}`,
  })
);

export const WeatherIcon = styled(WiDaySunny)({
  gridArea: 'weatherIcon',
  width: 'min(18rem,100%)',
  height: 'min(18rem,100%)',
});

export const Day = styled.h2({
  gridArea: 'day',
  justifySelf: 'center',
  margin: '1rem 0 0 0 ',
});

export const Temp = styled.div(
  {
    gridArea: 'temp',
    fontSize: '3rem',
  },
  ({ temperature }) => ({
    color: findTemperatureColor(temperature),
  })
);

export const Weather = styled.div({
  gridArea: 'weather',
  fontSize: '3rem',
});

export const TimeOfCommute = styled.div({
  gridArea: 'timeOfCommute',
  fontSize: '2rem',
});

export const Humidity = styled.div({
  gridArea: 'humidity',
  fontSize: '2rem',
  display: 'flex',
});

export const HumidityText = styled.div({
  marginLeft: '1rem',
});
