import React, { createContext, useState } from 'react';
import {
  CoordinatesType,
  GetWeatherSuitabilityType,
  PreferencesTypes,
  SaveCommuteTimeType,
  SavePreferencesType,
  SetCoordinatesType,
  WeatherInfoContextType,
} from './types';
import {
  formatTime,
  calculateWeatherSuitability,
  parseFromLocalStorage,
} from './weatherInfoHelpers';

const DEFAULT_PREFS: PreferencesTypes = {
  idealTemperature: { value: '20', priority: '100' },
  idealHumidity: { value: '50', priority: '100' },
};
const VALID_TIME_FORMAT = /^((2[0-3])|([0-1][0-9])):[0-5][0-9]$/;

const WeatherInfoContext = createContext({} as WeatherInfoContextType);

export const WeatherInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TODO: maybe get from DB later
  const [commuteTime, setCommuteTime] = useState(
    parseFromLocalStorage('savedCommuteTime') || [17, 30]
  );
  const [locationCoords, setLocationCoords]: [
    CoordinatesType,
    SetCoordinatesType
  ] = useState({} as CoordinatesType);
  const [preferences, setPreferences] = useState<PreferencesTypes>({
    ...DEFAULT_PREFS,
    ...parseFromLocalStorage('weatherPreferences'),
  });

  const saveCommuteTime: SaveCommuteTimeType = (time) => {
    if (!VALID_TIME_FORMAT.test(time)) {
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

  const getWeatherSuitability: GetWeatherSuitabilityType = (weather) =>
    calculateWeatherSuitability(weather, preferences);

  return (
    <WeatherInfoContext.Provider
      value={{
        commuteTime,
        getCommuteTimeString,
        saveCommuteTime,
        locationCoords,
        setLocationCoords,
        preferences,
        savePreferences,
        getWeatherSuitability,
      }}
    >
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoContext;
