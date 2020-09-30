import React, { createContext, useState } from 'react';

import { formatTime } from './weatherInfoHelpers';

type SaveCommuteTimeType = (time: string) => void;

type CoordinatesType = {
  latitude: number;
  longitude: number;
};

type SetCoordinatesType = (coords: CoordinatesType) => void;

type WeatherInfoContextType = {
  commuteTime: [number, number];
  getCommuteTimeString: () => string;
  saveCommuteTime: SaveCommuteTimeType;
  locationCoords: CoordinatesType;
  setLocationCoords: SetCoordinatesType;
};

const WeatherInfoContext = createContext({} as WeatherInfoContextType);

const validTimeFormat = /^((2[0-3])|([0-1][0-9])):[0-5][0-9]$/g;

export const WeatherInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // TODO: maybe get from DB later
  const [commuteTime, setCommuteTime] = useState(
    JSON.parse(localStorage.getItem('savedCommuteTime')!) || [17, 30]
  );
  const [locationCoords, setLocationCoords]: [
    CoordinatesType,
    SetCoordinatesType
  ] = useState({} as CoordinatesType);

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

  const getCommuteTimeString = () => formatTime(commuteTime[0], commuteTime[1]);

  return (
    <WeatherInfoContext.Provider
      value={{
        commuteTime,
        getCommuteTimeString,
        saveCommuteTime,
        locationCoords,
        setLocationCoords,
      }}
    >
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoContext;
