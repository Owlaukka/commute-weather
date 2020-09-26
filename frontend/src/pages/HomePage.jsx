import React, { useState } from 'react';
import styled from '@emotion/styled';

import { WeatherInfoProvider } from '../components/WeatherInfo/WeatherInfoContext';
import CommuteTimeForm from '../components/CommuteTimeForm/CommuteTimeForm';
import WeatherInfo from '../components/WeatherInfo';

const Page = styled.section({
  height: '100%',
  overflow: 'hidden',
});

const HomePage = () => {
  const [isTimeFormOpen, setIsTimeFormOpen] = useState(true);

  return (
    <Page>
      <WeatherInfoProvider>
        <CommuteTimeForm
          isOpen={isTimeFormOpen}
          setIsTimeFormOpen={setIsTimeFormOpen}
        />
        <WeatherInfo toggleFormVisible={setIsTimeFormOpen} />
      </WeatherInfoProvider>
    </Page>
  );
};

export default HomePage;
