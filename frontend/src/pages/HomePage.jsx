import React from 'react';
import styled from '@emotion/styled';

import WeatherInfoCardList from '../components/weatherInfo/WeatherInfoCardList';

const Main = styled.main(
  {
    overflow: 'auto',
    paddingTop: '1rem',
  },
  ({ theme }) => ({
    marginTop: theme.sizes.mobileNavbar,
    height: `calc(100vh - ${theme.sizes.mobileNavbar})`,
  })
);

const HomePage = () => (
  <>
    <Main>
      <WeatherInfoCardList />
    </Main>
  </>
);

export default HomePage;
