import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import WeatherScrollerOverlayButton from './WeatherScrollerOverlayButton.sc';

const WeatherOverlayButtons = ({ pointer, setPointer, listLength }) => (
  <>
    <WeatherScrollerOverlayButton
      direction="previous"
      onClick={() => setPointer((prev) => prev - 1)}
      disabled={!pointer}
    >
      <FaArrowLeft />
    </WeatherScrollerOverlayButton>
    <WeatherScrollerOverlayButton
      direction="next"
      onClick={() => setPointer((prev) => prev + 1)}
      disabled={pointer >= listLength - 1}
    >
      <FaArrowRight />
    </WeatherScrollerOverlayButton>
  </>
);

WeatherOverlayButtons.propTypes = {
  pointer: PropTypes.number.isRequired,
  setPointer: PropTypes.func.isRequired,
  listLength: PropTypes.number.isRequired,
};

export default WeatherOverlayButtons;
