import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import WeatherInfoContext from '../WeatherInfoContext';

const Form = styled.form({
  padding: '1rem',
});

const CommuteTimeForm = ({ open, setOpen }) => {
  const { getCommuteTimeString, saveCommuteTime } = useContext(
    WeatherInfoContext
  );
  const [newCommuteTime, setNewCommuteTime] = useState(getCommuteTimeString());

  const updateCommuteTimeInput = (e) => setNewCommuteTime(e.target.value);

  const saveNewCommuteTime = (e) => {
    e.preventDefault();
    saveCommuteTime(newCommuteTime);
    setOpen(true);
  };

  return (
    <Form>
      <label htmlFor="planned-commute-input">
        <b>Time of planned commute</b>
        {/* TODO: make a reusable when more inputs added */}
        <input
          id="planned-commute-input"
          tabIndex={open ? 0 : -1}
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
        tabIndex={open ? 0 : -1}
        onClick={saveNewCommuteTime}
      >
        Confirm
      </button>
    </Form>
  );
};

CommuteTimeForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default CommuteTimeForm;
