import React from 'react';
import styled from '@emotion/styled';

import { WeatherInfoProvider } from '../components/weatherInfo/WeatherInfoContext';
import WeatherInfoCarousel from '../components/weatherInfo/WeatherInfoCarousel';
import WeatherFetcher from '../components/weatherInfo/WeatherFetcher';
import MenuButton from '../components/weatherInfo/CommuteTimeForm/MenuButton';

const Page = styled.section({
  height: '100%',
  overflow: 'hidden',
});

const HomePage = () => (
  <Page>
    <WeatherInfoProvider>
      <MenuButton />
      {/* TODO: turn this into a custom hook? */}
      <WeatherFetcher>
        {(weatherList) => <WeatherInfoCarousel list={weatherList} />}
      </WeatherFetcher>
    </WeatherInfoProvider>
  </Page>
);

export default HomePage;
