import { PreferencesTypes } from '../WeatherInfo/types';

// TODO: There probably exists a builtin type for this...?
type ActionType = {
  type: string;
  payload?: number;
};

const reducer = (
  state: PreferencesTypes,
  action: ActionType
): PreferencesTypes => {
  switch (action.type) {
    case 'changeIdealTemperatureValue': {
      if (!action.payload && action.payload !== 0) return state;
      return {
        ...state,
        idealTemperature: {
          ...state.idealTemperature,
          value: action.payload,
        },
      };
    }
    case 'changeIdealTemperaturePriority': {
      if (!action.payload && action.payload !== 0) return state;
      return {
        ...state,
        idealTemperature: {
          ...state.idealTemperature,
          priority: action.payload,
        },
      };
    }
    case 'changeIdealHumidityValue': {
      if (!action.payload && action.payload !== 0) return state;
      return {
        ...state,
        idealHumidity: {
          ...state.idealHumidity,
          value: action.payload,
        },
      };
    }
    case 'changeIdealHumidityPriority': {
      if (!action.payload && action.payload !== 0) return state;
      return {
        ...state,
        idealHumidity: {
          ...state.idealHumidity,
          priority: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
