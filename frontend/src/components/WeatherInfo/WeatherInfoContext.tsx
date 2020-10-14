import React, { createContext, useState } from 'react';
import {
  CalculateWeatherSuitabilityType,
  CoordinatesType,
  PreferencesTypes,
  SaveCommuteTimeType,
  SavePreferencesType,
  SetCoordinatesType,
  WeatherInfoContextType,
} from './types';

import { formatTime } from './weatherInfoHelpers';

const WeatherInfoContext = createContext({} as WeatherInfoContextType);

const validTimeFormat = /^((2[0-3])|([0-1][0-9])):[0-5][0-9]$/;

export const WeatherInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TODO: maybe get from DB later
  const [commuteTime, setCommuteTime] = useState(
    JSON.parse(localStorage.getItem('savedCommuteTime') || '') || [17, 30]
  );
  const [locationCoords, setLocationCoords]: [
    CoordinatesType,
    SetCoordinatesType
  ] = useState({} as CoordinatesType);
  const [, setPreferences] = useState<PreferencesTypes>();

  const saveCommuteTime: SaveCommuteTimeType = (time) => {
    if (!validTimeFormat.test(time)) {
      // eslint-disable-next-line no-console
      console.error(
        'Supplied commute time is not in the correct format or the correct type'
      );
      return;
    }
    const timeSplit = time.split(':');
    const formattedTime = [
      parseInt(timeSplit[0], 10),
      parseInt(timeSplit[1], 10),
    ];
    setCommuteTime(formattedTime);
    localStorage.setItem('savedCommuteTime', JSON.stringify(formattedTime));
  };

  const savePreferences: SavePreferencesType = (prefs) => {
    setPreferences(prefs);
    localStorage.setItem('weatherPreferences', JSON.stringify(prefs));
  };

  const getCommuteTimeString = () => formatTime(commuteTime[0], commuteTime[1]);

  // TODO: add accurate weather type
  const calculateWeatherSuitability: CalculateWeatherSuitabilityType = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    weather
  ) => {
    JSON.parse(localStorage.getItem('weatherPreferences') || '');
    return 100;
  };

  return (
    <WeatherInfoContext.Provider
      value={{
        commuteTime,
        getCommuteTimeString,
        saveCommuteTime,
        locationCoords,
        setLocationCoords,
        savePreferences,
        calculateWeatherSuitability,
      }}
    >
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoContext;
