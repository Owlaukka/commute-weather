import React from 'react';
import styled from '@emotion/styled';

import WeatherInfoCard from './WeatherInfoCard';

const List = styled.ul({
  width: 'min(100vw, 45rem)',
  margin: '0 auto',
  padding: '1rem',
  '& > li:not(:last-child)': {
    marginBottom: '3rem',
  },
});

const WeatherInfoCardList = () => (
  <List>
    {[0, 1, 2].map((daysIntoFuture) => (
      <WeatherInfoCard key={daysIntoFuture} daysIntoFuture={daysIntoFuture} />
    ))}
  </List>
);

export default WeatherInfoCardList;
