import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import WeatherInfoContext from '../WeatherInfo/WeatherInfoContext';
import { Button } from '../common/buttons';
import debounce from '../../helpers/debounce';
import { isTablet } from '../../helpers/mediaQueries';

const FormWrapper = styled.section(({ theme, isOpen }) => ({
  position: 'fixed',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  height: `${theme.sizes.commuteTimeFormHeight}rem`,
  top: isOpen ? 0 : `-${theme.sizes.commuteTimeFormHeight}rem`,
  transition: 'top 300ms',
}));

const Form = styled.form(({ theme }) => ({
  padding: '0 1rem',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  background: theme.colors.black,
  boxShadow: `0 0 12px 2px ${theme.colors.black}`,
  [media('<tablet')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ToggleFormButton = styled(Button)(({ theme, isOpen }) => ({
  height: '100%',
  marginLeft: 'auto',
  padding: '1rem',
  transition: 'top 300ms',
  position: 'relative',
  top: isOpen ? 0 : `${theme.sizes.commuteTimeFormHeight}rem`,
}));

const CommuteTimeForm = ({ isOpen, setIsTimeFormOpen }) => {
  const { getCommuteTimeString, saveCommuteTime } = useContext(
    WeatherInfoContext
  );
  const [newCommuteTime, setNewCommuteTime] = useState(getCommuteTimeString());

  const updateCommuteTimeInput = (e) => setNewCommuteTime(e.target.value);

  const saveNewCommuteTime = (e) => {
    e.preventDefault();
    saveCommuteTime(newCommuteTime);
  };

  const toggleOpen = () => setIsTimeFormOpen((prev) => !prev);

  useEffect(() => {
    const onResize = () => {
      const isSmallTabletHeight = window.innerHeight < 730 && isTablet();
      setIsTimeFormOpen(!isSmallTabletHeight);
    };
    onResize();

    const debouncedOnResize = debounce(onResize, 100);
    window.addEventListener('resize', debouncedOnResize);
    return () => window.removeEventListener('resize', debouncedOnResize);
  }, [setIsTimeFormOpen]);

  // TODO: style this properly, especially buttons
  return (
    <FormWrapper isOpen={isOpen}>
      <Form>
        <label htmlFor="planned-commute-input">
          <b>Time of planned commute</b>
          {/* TODO: make a reusable when more inputs added */}
          <input
            id="planned-commute-input"
            tabIndex={isOpen ? 0 : -1}
            type="time"
            step="300"
            required
            pattern="[0-9]{2}:[0-9]{2}"
            value={newCommuteTime}
            onChange={updateCommuteTimeInput}
          />
        </label>
        <Button
          type="submit"
          tabIndex={isOpen ? 0 : -1}
          onClick={saveNewCommuteTime}
        >
          Confirm
        </Button>
        <ToggleFormButton
          isOpen={isOpen}
          tabIndex={isOpen ? 0 : -1}
          onClick={toggleOpen}
        >
          {/* TODO: change to an icon or css trickery arrow to animate it easily */}
          {isOpen ? 'Close' : 'Open'}
        </ToggleFormButton>
      </Form>
    </FormWrapper>
  );
};

CommuteTimeForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsTimeFormOpen: PropTypes.func.isRequired,
};

export default CommuteTimeForm;
