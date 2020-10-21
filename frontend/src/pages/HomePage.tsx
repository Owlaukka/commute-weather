import React from 'react';
import styled from '@emotion/styled';

import { WeatherInfoProvider } from '../components/WeatherInfo/WeatherInfoContext';
import WeatherInfo from '../components/WeatherInfo';

const Page = styled.section({
  height: '100%',
  overflow: 'hidden',
});

const HomePage = () => {
  return (
    <Page>
      <WeatherInfoProvider>
        <WeatherInfo />
      </WeatherInfoProvider>
    </Page>
  );
};

export default HomePage;
