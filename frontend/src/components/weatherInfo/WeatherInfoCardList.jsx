import React, { useEffect, useState, useContext } from 'react';
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

const WeatherInfoCardList = () => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator?.geolocation.getCurrentPosition(
      (position) => setCoords(position.coords),
      (error) =>
        console.error('Error Code = ' + error.code + ' - ' + error.message)
    );
  }, []);

  return (
    <List>
      {[0, 1, 2].map((daysIntoFuture) => (
        <WeatherInfoCard
          key={daysIntoFuture}
          daysIntoFuture={daysIntoFuture}
          coords={coords}
        />
      ))}
    </List>
  );
};

export default WeatherInfoCardList;
