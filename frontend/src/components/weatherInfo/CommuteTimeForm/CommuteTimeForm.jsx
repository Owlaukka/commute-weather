import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';

import WeatherInfoContext from '../WeatherInfoContext';

const Form = styled.form({
  padding: '1rem',
});

const CommuteTimeForm = () => {
  const { getCommuteTimeString, saveCommuteTime } = useContext(
    WeatherInfoContext
  );
  const [newCommuteTime, setNewCommuteTime] = useState(getCommuteTimeString());

  const updateCommuteTimeInput = (e) => setNewCommuteTime(e.target.value);

  const saveNewCommuteTime = (e) => {
    e.preventDefault();
    saveCommuteTime(newCommuteTime);
  };

  return (
    <Form>
      <label htmlFor="planned-commute-input">
        <b>Time of planned commute</b>
        {/* TODO: make a reusable when more inputs added */}
        <input
          id="planned-commute-input"
          data-testid="planned-commute-input" // TODO: change to user-centric selector
          type="time"
          step="300"
          required
          pattern="[0-9]{2}:[0-9]{2}"
          value={newCommuteTime}
          onChange={updateCommuteTimeInput}
        />
      </label>
      <button
        type="submit"
        data-testid="planned-commute-submit-button"
        onClick={saveNewCommuteTime}
      >
        Confirm
      </button>
    </Form>
  );
};

export default CommuteTimeForm;
