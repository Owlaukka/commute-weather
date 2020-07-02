import { createContext } from 'react';

const WeatherInfoContext = createContext(null);

export const WeatherInfoProvider = ({ children, settings }) => {
  const [weatherData, setWeatherData] = useState([]);

  const saveWeatherInfo = (values) => {
    setWeatherData(values);
  };

  return (
    <WeatherInfoContext.Provider value={{ data: weatherData, saveWeatherInfo }}>
      {children}
    </WeatherInfoContext.Provider>
  );
};

export const WeatherInfoConsumer = WeatherInfoContext.Consumer;

export default WeatherInfoContext;
