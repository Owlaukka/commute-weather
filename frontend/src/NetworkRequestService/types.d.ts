/* eslint-disable @typescript-eslint/indent */
import { QueryTuple } from '@apollo/client';

export type WeatherType = {
  time: string;
  temperature: {
    isDaily: boolean;
    temp?: number;
    min?: number;
    max?: number;
  };
  weather: [{ main: string; icon: string }];
  humidity: number;
};

export type WeatherResponseType = {
  weather: WeatherType[];
};

export type WeatherQueryVariablesType = {
  lat: number;
  lon: number;
  time: string;
  requestedAt: string;
};

export type LazyQueryHookType = QueryTuple<
  WeatherResponseType,
  WeatherQueryVariablesType
>;

export type UseFetchWeatherType = () => {
  loading: boolean;
  data: WeatherResponseType | undefined;
};
