import { createContext, useState } from 'react';
import dayjs from 'dayjs';

const WeatherInfoContext = createContext(null);

export const WeatherInfoProvider = ({ children }) => {
  // TODO: maybe get from DB later
  const [commuteTime, setCommuteTime] = useState(
    localStorage.getItem('savedCommuteTime') ||
      dayjs()
        .startOf('day')
        .hour(17)
        .minute(35)
        .format('HH:mm')
  );

  const saveCommuteTime = (time) => {
    setCommuteTime(time);
    localStorage.setItem('savedCommuteTime', time);
  };

  return (
    <WeatherInfoContext.Provider value={{ commuteTime, saveCommuteTime }}>
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoContext;
