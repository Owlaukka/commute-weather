import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react';
import WeatherInfoCard from '../../../src/components/weatherInfo/WeatherInfoCard';

// TODO: figure out an easier way include the theme to the tests
// Or a way to not include the theme
import theme from '../../../src/theme';

describe('WeatherInfoCard', () => {
  it('should display weather correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <WeatherInfoCard
          weather={{
            temperature: { isDaily: false, temp: 12.6 },
            weather: [
              { main: 'clouds', icon: '12d' },
              { main: 'light rain', icon: '02d' },
            ],
            time: '2020-08-30T12:12:30',
            humidity: 69,
          }}
        />
      </ThemeProvider>
    );

    expect(getByText('clouds, light rain')).to.exist;
  });

  it('should display given time correctly', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <WeatherInfoCard
          weather={{
            temperature: 12.6,
            weather: ['clouds', 'light rain'],
            time: '2020-08-30T12:12:30',
            humidity: 69,
          }}
        />
      </ThemeProvider>
    );

    expect(getByText('12:12')).to.exist;
  });
});
