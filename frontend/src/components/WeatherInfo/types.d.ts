import { WeatherType } from '../../NetworkRequestService/types';
import { CoordinatesType } from '../LocationGetter/useBrowserCoordinates';

export type SaveCommuteTimeType = (time: string) => void;

export type PreferencesTypes = {
  idealTemperature: { value?: string; priority?: string };
  idealHumidity: { value?: string; priority?: string };
};

export type SetCoordinatesType = (coords: CoordinatesType) => void;
export type SavePreferencesType = (prefs: PreferencesTypes) => void;
export type GetWeatherSuitabilityType = (weather: WeatherType) => number;
export type CalculateWeatherSuitabilityType = (
  weather: WeatherType,
  preferences: PreferencesTypes
) => number;

export type WeatherInfoContextType = {
  commuteTime: [number, number];
  getCommuteTimeString: () => string;
  saveCommuteTime: SaveCommuteTimeType;
  locationCoords: CoordinatesType;
  setLocationCoords: SetCoordinatesType;
  preferences: PreferencesTypes;
  savePreferences: SavePreferencesType;
  getWeatherSuitability: GetWeatherSuitabilityType;
};
