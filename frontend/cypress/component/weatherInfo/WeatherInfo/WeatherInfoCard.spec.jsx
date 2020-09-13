import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { ThemeProvider } from 'emotion-theming';
import dayjs from 'dayjs';

import WeatherInfoCard from '../../../../src/components/WeatherInfo/WeatherCard/WeatherInfoCard';
import theme from '../../../../src/theme';

describe('components', () => {
  it('works', () => {
    mount(
      <ThemeProvider theme={theme}>
        <WeatherInfoCard
          weather={{
            temperature: {
              isDaily: false,
              temp: 20.6,
            },
            weather: [{ main: 'Cloudsette', icon: '10d' }],
            time: dayjs().format(),
            humidity: 65,
          }}
        />
      </ThemeProvider>
    );
    cy.findByText('20.6°C').should('be.visible');
    cy.findByText('Today').should('be.visible');
  });
});
