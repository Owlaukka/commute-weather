import React, { useCallback, useContext, useReducer } from 'react';
import styled from '@emotion/styled';
import { Modal, Button } from '../common';
import WeatherInfoContext from '../WeatherInfo/WeatherInfoContext';
import PreferencesReducer from './PreferencesReducer';

type PreferancesModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const Input = styled.input({
  width: '100%',
  marginBottom: '1rem',
});

const PreferancesModal = ({
  isModalOpen,
  closeModal,
}: PreferancesModalProps) => {
  const { preferences, savePreferences } = useContext(WeatherInfoContext);
  const [formState, dispatch] = useReducer(PreferencesReducer, preferences);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePreferences(formState);
    closeModal();
  };

  const dispatchOnChange = useCallback(
    (action: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: action,
        payload: parseInt(e.target.value, 10),
      });
    },
    []
  );
  return (
    <Modal {...{ isModalOpen, closeModal }}>
      <h1>Ideal commute weather</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Temperature</legend>
          <label htmlFor="ideal-temperature.value">
            <b>Value</b>
            <Input
              id="ideal-temperature.value"
              type="number"
              min="-40"
              max="40"
              value={formState.idealTemperature?.value}
              onChange={dispatchOnChange('changeIdealTemperatureValue')}
            />
          </label>
          <label htmlFor="ideal-temperature.priority">
            <b>Importance</b>
            <Input
              id="ideal-temperature.priority"
              type="range"
              min="0"
              max="100"
              value={formState.idealTemperature?.priority}
              onChange={dispatchOnChange('changeIdealTemperaturePriority')}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Humidity</legend>
          <label htmlFor="ideal-temperature.value">
            <b>Value</b>
            <Input
              id="ideal-temperature.value"
              type="number"
              min="0"
              max="100"
              value={formState.idealHumidity?.value}
              onChange={dispatchOnChange('changeIdealHumidityValue')}
            />
          </label>
          <label htmlFor="ideal-temperature.priority">
            <b>Importance</b>
            <Input
              id="ideal-temperature.priority"
              type="range"
              min="0"
              max="100"
              value={formState.idealHumidity?.priority}
              onChange={dispatchOnChange('changeIdealHumidityPriority')}
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
