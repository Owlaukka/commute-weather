import { createContext, useState } from 'react';
import dayjs from 'dayjs';

const WeatherInfoContext = createContext(null);

export const WeatherInfoProvider = ({ children }) => {
  // TODO: get from localstorage or db later
  const [commuteTime, setCommuteTime] = useState(
    dayjs()
      .startOf('day')
      .hour(17)
      .minute(35)
      .format('HH:mm')
  );

  const saveCommuteTime = (time) => {
    setCommuteTime(time);
  };

  return (
    <WeatherInfoContext.Provider value={{ commuteTime, saveCommuteTime }}>
      {children}
    </WeatherInfoContext.Provider>
  );
};

export default WeatherInfoContext;
