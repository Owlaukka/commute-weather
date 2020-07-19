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
  const { commuteTime, saveCommuteTime } = useContext(WeatherInfoContext);
  const [newCommuteTime, setNewCommuteTime] = useState(commuteTime);
  return (
    <Form>
      <label htmlFor="planned-commute-input">
        <b>Time of planned commute</b>
        {/* TODO: make a reusable when more inputs added */}
        <input
          id="planned-commute-input"
          required
          type="time"
          value={newCommuteTime}
          onChange={(e) => setNewCommuteTime(e.target.value)}
        />
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          saveCommuteTime(newCommuteTime);
        }}
        role="submit"
      >
        Confirm
      </button>
    </Form>
  );
};

export default CommuteTimeForm;
