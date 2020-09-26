import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { formatTime } from './weatherInfoHelpers';

const WeatherInfoContext = createContext(null);
const validTimeFormat = /^((2[0-3])|([0-1][0-9])):[0-5][0-9]$/g;

export const WeatherInfoProvider = ({ children }) => {
  // TODO: maybe get from DB later
  const [commuteTime, setCommuteTime] = useState(
    JSON.parse(localStorage.getItem('savedCommuteTime')) || [17, 30]
  );
  const [locationCoords, setLocationCoords] = useState({});

  const saveCommuteTime = (time) => {
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

WeatherInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WeatherInfoContext;
