import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import WeatherInfoContext from '../weatherInfo/WeatherInfoContext';

const Form = styled.form(
  {
    padding: '1rem',
    [media('>=desktop')]: {
      maxWidth: 'max-content',
    },
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.black,
    boxShadow: `0 0 15px 0px ${theme.colors.black}`,
  })
);

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
          data-testid="planned-commute-input"
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
