import React from 'react';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import { WeatherInfoProvider } from '../components/weatherInfo/WeatherInfoContext';
import WeatherInfoCardList from '../components/weatherInfo/WeatherInfoCardList';
import CommuteTimeForm from '../components/commuteTime/CommuteTimeForm';

const Grid = styled.section({
  margin: '1rem 0',
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: '1fr auto 1fr',
  gridTemplateRows: 'auto auto',
  gridTemplateAreas: `". settingsForm ."
                      ". weatherList ."
                      `,
  [media('>=desktop')]: {
    margin: '1rem',
    gridTemplateAreas: `". weatherList settingsForm"
                        ". weatherList settingsForm"
                        `,
  },
});

const SettingsForm = styled.aside({
  gridArea: 'settingsForm',
});

const WeatherList = styled(WeatherInfoCardList)({
  gridArea: 'weatherList',
});

const Form = styled.form(
  {
    padding: '1rem',
    [media('>=desktop')]: {
      width: 'min-content',
    },
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.black,
    boxShadow: `0 0 15px 0px ${theme.colors.black}`,
  })
);

const HomePage = () => (
  <Grid>
    <WeatherInfoProvider>
      <SettingsForm>
        <CommuteTimeForm />
      </SettingsForm>
      <WeatherList />
    </WeatherInfoProvider>
  </Grid>
);

export default HomePage;
