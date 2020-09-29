import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { formatTime } from './weatherInfoHelpers';

type SaveCommuteTimeType = (time: string) => void;

type WeatherInfoContextInterface = {
  commuteTime: [number, number];
  getCommuteTimeString: () => string;
  saveCommuteTime: SaveCommuteTimeType;
  locationCoords: {};
  setLocationCoords: (coords: {}) => void;
};

const WeatherInfoContext = createContext({} as WeatherInfoContextInterface);

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
  const [locationCoords, setLocationCoords] = useState({});

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

  const contextValue: WeatherInfoContextInterface = {
    commuteTime,
    getCommuteTimeString,
    saveCommuteTime,
    locationCoords,
    setLocationCoords,
  };
  return (
    <WeatherInfoContext.Provider value={contextValue}>
      {children}
    </WeatherInfoContext.Provider>
  );
};

WeatherInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WeatherInfoContext;
