import React from 'react';
import styled from '@emotion/styled';

import { WeatherInfoProvider } from '../components/WeatherInfo/WeatherInfoContext';
import MenuButton from '../components/CommuteTimeForm/MenuButton';
import WeatherInfo from '../components/WeatherInfo';

const Page = styled.section({
  height: '100%',
  overflow: 'hidden',
});

const HomePage = () => (
  <Page>
    <WeatherInfoProvider>
      <MenuButton />
      {/* TODO: turn this into a custom hook? */}
      <WeatherInfo />
    </WeatherInfoProvider>
  </Page>
);

export default HomePage;
