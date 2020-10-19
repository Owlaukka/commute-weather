import { WeatherType } from '../../NetworkRequestService/types';

export type SaveCommuteTimeType = (time: string) => void;

export type CoordinatesType = {
  latitude: number;
  longitude: number;
};

export type PreferencesTypes = {
  idealTemperature: { value: number; priority: number };
  idealHumidity: { value: number; priority: number };
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