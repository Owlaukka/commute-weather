import { PreferencesTypes } from '../WeatherInfo/types';

export const CHANGE_IDEAL_TEMPERATURE_VALUE = 'changeIdealTemperatureValue';
export const CHANGE_IDEAL_TEMPERATURE_PRIORITY =
  'changeIdealTemperaturePriority';
export const CHANGE_IDEAL_HUMIDITY_VALUE = 'changeIdealHumidityValue';
export const CHANGE_IDEAL_HUMIDITY_PRIORITY = 'changeIdealHumidityPriority';

// TODO: There probably exists a builtin type for this...?
type ActionType = {
  type: string;
  payload: string;
};

const reducer = (
  state: PreferencesTypes,
  action: ActionType
): PreferencesTypes => {
  switch (action.type) {
    case CHANGE_IDEAL_TEMPERATURE_VALUE: {
      return {
        ...state,
        idealTemperature: {
          ...state.idealTemperature,
          value: action.payload,
        },
      };
    }
    case CHANGE_IDEAL_TEMPERATURE_PRIORITY: {
      return {
        ...state,
        idealTemperature: {
          ...state.idealTemperature,
          priority: action.payload,
        },
      };
    }
    case CHANGE_IDEAL_HUMIDITY_VALUE: {
      return {
        ...state,
        idealHumidity: {
          ...state.idealHumidity,
          value: action.payload,
        },
      };
    }
    case CHANGE_IDEAL_HUMIDITY_PRIORITY: {
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
