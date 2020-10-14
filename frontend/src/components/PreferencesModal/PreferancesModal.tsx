import styled from '@emotion/styled';
import React, { useContext, useReducer } from 'react';
import { Modal, Button } from '../common';
import { PreferencesTypes } from '../WeatherInfo/types';
import WeatherInfoContext from '../WeatherInfo/WeatherInfoContext';

type PreferancesModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const Input = styled.input({
  width: '100%',
  marginBottom: '1rem',
});

// TODO: There probably exists a builtin type for this...?
type ActionType = {
  type: string;
  payload?: any;
};

const initialState: PreferencesTypes = {
  idealTemperature: { value: 20, priority: 100 },
};

function reducer(
  state: PreferencesTypes,
  action: ActionType
): PreferencesTypes {
  switch (action.type) {
    case 'changeIdealTemperatureValue':
      return {
        ...state,
        idealTemperature: {
          ...state.idealTemperature,
          value:
            parseInt(action.payload, 10) || initialState.idealTemperature.value,
        },
      };
    case 'changeIdealTemperaturePriority':
      return {
        ...state,
        idealTemperature: {
          ...state.idealTemperature,
          priority:
            parseInt(action.payload, 10) ||
            initialState.idealTemperature.priority,
        },
      };
    default:
      return state;
  }
}

const PreferancesModal = ({
  isModalOpen,
  closeModal,
}: PreferancesModalProps) => {
  const { savePreferences } = useContext(WeatherInfoContext);
  const [formState, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePreferences(formState);
    closeModal();
  };

  return (
    <Modal {...{ isModalOpen, closeModal }}>
      <h1>Your ideal commute weather</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Ideal Temperature</legend>
          <label htmlFor="ideal-temperature.value">
            <b>Temperature</b>
            <Input
              type="number"
              id="ideal-temperature.value"
              value={formState.idealTemperature.value}
              onChange={(e) =>
                dispatch({
                  type: 'changeIdealTemperatureValue',
                  payload: e.target.value,
                })
              }
            />
          </label>
          <label htmlFor="ideal-temperature.priority">
            <b>Temperature Priority</b>
            <Input
              type="range"
              id="ideal-temperature.priority"
              value={formState.idealTemperature.priority}
              onChange={(e) =>
                dispatch({
                  type: 'changeIdealTemperaturePriority',
                  payload: e.target.value,
                })
              }
            />
          </label>
        </fieldset>
        <Button onClick={closeModal}>Cancel</Button>
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};

export default PreferancesModal;
