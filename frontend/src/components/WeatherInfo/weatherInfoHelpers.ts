import dayjs from 'dayjs';
import { WeatherType } from '../../NetworkRequestService/types';
import { CalculateWeatherSuitabilityType, PreferencesTypes } from './types';

const HIGH_TEMP_LIMIT = 36;
const LOW_TEMP_LIMIT = -18;
const MAX_TEMP_DIFFERENCE = 20;

export const findTemperatureColor = (temperature: number): string => {
  const fullRangeSize = HIGH_TEMP_LIMIT - LOW_TEMP_LIMIT;
  const adjustedTemp = temperature + Math.abs(LOW_TEMP_LIMIT);
  const tempPerc = 1 - Math.min(Math.max(adjustedTemp / fullRangeSize, 0), 1);

  return `hsl(${Math.round(260 * tempPerc * 100) / 100}, 100%, 50%)`;
};

// color red to green
export const calculateSuitabilityColor = (suitablity: number): string =>
  `hsl(${Math.round(suitablity * 100)}, 100%, 50%)`;

export const formatTime = (hour: number, minute: number): string =>
  dayjs().hour(hour).minute(minute).format('HH:mm');

const calculateTempSuitability = (
  temperature: WeatherType['temperature'],
  idealTemperature: PreferencesTypes['idealTemperature']
): number => {
  const temp = temperature.isDaily
    ? (temperature.min! + temperature.max!) / 2
    : temperature.temp!;
  // difference 0 - 20
  const normalizedTempDifference = Math.min(
    Math.max(Math.abs(temp - idealTemperature.value), 0),
    MAX_TEMP_DIFFERENCE
  );
  const tempValueSuitability = normalizedTempDifference / MAX_TEMP_DIFFERENCE;
  return 1 - (idealTemperature.priority / 100) * tempValueSuitability;
};

const calculateHumiditySuitability = (
  humidity: WeatherType['humidity'],
  idealHumidity: PreferencesTypes['idealHumidity']
): number => {
  const normalizedHumidityDifference = Math.abs(humidity - idealHumidity.value);
  const humidityValueSuitability = normalizedHumidityDifference / 100;
  return 1 - (idealHumidity.priority / 100) * humidityValueSuitability;
};

export const calculateWeatherSuitability: CalculateWeatherSuitabilityType = (
  { temperature, humidity },
  preferences
) => {
  const tempResult = calculateTempSuitability(
    temperature,
    preferences.idealTemperature
  );
  const humidityResult = calculateHumiditySuitability(
    humidity,
    preferences.idealHumidity
  );

  return tempResult * humidityResult;
};

export const parseFromLocalStorage = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || ''); // parsing '' will error
  } catch (e) {
    console.warn(`Error parsing ${key} from localStorage: ${e}`);
    return null;
  }
};
