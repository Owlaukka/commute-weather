import React, { useContext, useEffect, useState } from 'react';

import WeatherInfoContext from '../WeatherInfo/WeatherInfoContext';
import { Button } from '../common/buttons';
import debounce from '../../helpers/debounce';
import { isTablet } from '../../helpers/mediaQueries';
import { FormWrapper, Form, ToggleFormButton } from './CommuteTimeForm.sc';

type CommuteTimeFormProps = {
  isOpen: boolean;
  // TODO: maybe attach this to it's origin too somehow...
  setIsTimeFormOpen: (arg: ((prev: boolean) => boolean) | boolean) => void;
};

type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

const CommuteTimeForm = ({
  isOpen,
  setIsTimeFormOpen,
}: CommuteTimeFormProps) => {
  const { getCommuteTimeString, saveCommuteTime } = useContext(
    WeatherInfoContext
  );

  const [newCommuteTime, setNewCommuteTime] = useState(getCommuteTimeString());

  const updateCommuteTimeInput: InputChangeHandler = (e) =>
    setNewCommuteTime(e.target.value);

  const saveNewCommuteTime: ClickHandler = (e) => {
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

export default CommuteTimeForm;
