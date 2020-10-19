import React, { useCallback, useContext, useReducer } from 'react';

import { Modal, Button } from '../common';
import WeatherInfoContext from '../WeatherInfo/WeatherInfoContext';
import PreferencesReducer from './PreferencesReducer';
import { Fieldset, Input, RangeInput } from './PreferencesModal.sc';

type PreferancesModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

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
        <Fieldset>
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
            <RangeInput
              id="ideal-temperature.priority"
              type="range"
              value={formState.idealTemperature?.priority}
              onChange={dispatchOnChange('changeIdealTemperaturePriority')}
            />
          </label>
        </Fieldset>
        <Fieldset>
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
            <RangeInput
              id="ideal-temperature.priority"
              type="range"
              value={formState.idealHumidity?.priority}
              onChange={dispatchOnChange('changeIdealHumidityPriority')}
            />
          </label>
        </Fieldset>
        <Button onClick={closeModal}>Cancel</Button>
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};

export default PreferancesModal;
