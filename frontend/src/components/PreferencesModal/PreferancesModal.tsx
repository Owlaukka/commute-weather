import React, { useCallback, useContext, useReducer } from 'react';

import { Modal, Button } from '../common';
import WeatherInfoContext from '../WeatherInfo/WeatherInfoContext';
import PreferencesReducer, {
  CHANGE_IDEAL_HUMIDITY_PRIORITY,
  CHANGE_IDEAL_HUMIDITY_VALUE,
  CHANGE_IDEAL_TEMPERATURE_PRIORITY,
  CHANGE_IDEAL_TEMPERATURE_VALUE,
} from './PreferencesReducer';
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
      if (/^-?[0-9]*$/.test(e.target.value)) {
        dispatch({
          type: action,
          payload: e.target.value,
        });
      }
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
              value={formState.idealTemperature?.value}
              onChange={dispatchOnChange(CHANGE_IDEAL_TEMPERATURE_VALUE)}
            />
          </label>
          <label htmlFor="ideal-temperature.priority">
            <b>Importance</b>
            <RangeInput
              id="ideal-temperature.priority"
              type="range"
              value={formState.idealTemperature?.priority}
              onInput={dispatchOnChange(CHANGE_IDEAL_TEMPERATURE_PRIORITY)}
            />
          </label>
        </Fieldset>
        <Fieldset>
          <legend>Humidity</legend>
          <label htmlFor="ideal-temperature.value">
            <b>Value</b>
            <Input
              id="ideal-temperature.value"
              value={formState.idealHumidity?.value}
              onChange={dispatchOnChange(CHANGE_IDEAL_HUMIDITY_VALUE)}
            />
          </label>
          <label htmlFor="ideal-temperature.priority">
            <b>Importance</b>
            <RangeInput
              id="ideal-temperature.priority"
              type="range"
              value={formState.idealHumidity?.priority}
              onInput={dispatchOnChange(CHANGE_IDEAL_HUMIDITY_PRIORITY)}
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
