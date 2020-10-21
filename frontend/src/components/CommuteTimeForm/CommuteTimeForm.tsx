import React, { FormEvent, useContext, useEffect, useState } from 'react';

import WeatherInfoContext from '../WeatherInfo/WeatherInfoContext';
import debounce from '../../helpers/debounce';
import { isTablet } from '../../helpers/mediaQueries';
import {
  NavbarWrapper,
  Navbar,
  ToggleNavbarButton,
  CommuteTimeFormElement,
  CommuteTimeInputWrapper,
  CommuteTimeFormSubmitButton,
  CommuteTimeInputElement,
} from './CommuteTimeForm.sc';
import PreferencesButton from './PreferencesButton';

type CommuteTimeFormProps = {
  isOpen: boolean;
  // TODO: maybe attach this to it's origin too somehow...
  setIsTimeFormOpen: (arg: ((prev: boolean) => boolean) | boolean) => void;
};

const CommuteTimeForm = ({
  isOpen,
  setIsTimeFormOpen,
}: CommuteTimeFormProps) => {
  const { getCommuteTimeString, saveCommuteTime } = useContext(
    WeatherInfoContext
  );

  const [newCommuteTime, setNewCommuteTime] = useState(getCommuteTimeString());

  const updateCommuteTimeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setNewCommuteTime(e.target.value);

  const saveNewCommuteTime = (e: FormEvent): void => {
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
    <NavbarWrapper isOpen={isOpen}>
      <Navbar>
        <CommuteTimeFormElement onSubmit={saveNewCommuteTime}>
          <CommuteTimeInputWrapper htmlFor="planned-commute-input">
            <b>Time of planned commute</b>
            {/* TODO: make a reusable when more inputs added */}
            <CommuteTimeInputElement
              id="planned-commute-input"
              tabIndex={isOpen ? 0 : -1}
              type="time"
              step="300"
              required
              pattern="[0-9]{2}:[0-9]{2}"
              value={newCommuteTime}
              onChange={updateCommuteTimeInput}
            />
          </CommuteTimeInputWrapper>
          <CommuteTimeFormSubmitButton type="submit" tabIndex={isOpen ? 0 : -1}>
            Confirm
          </CommuteTimeFormSubmitButton>
        </CommuteTimeFormElement>
        <PreferencesButton isOpen={isOpen} />
        <ToggleNavbarButton
          isOpen={isOpen}
          tabIndex={isOpen ? 0 : -1}
          onClick={toggleOpen}
        />
      </Navbar>
    </NavbarWrapper>
  );
};

export default CommuteTimeForm;
