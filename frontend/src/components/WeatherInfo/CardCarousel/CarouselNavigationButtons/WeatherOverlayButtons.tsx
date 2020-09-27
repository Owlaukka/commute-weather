import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import WeatherScrollerOverlayButton from './WeatherScrollerOverlayButton.sc';

type Props = {
  pointer: number;
  setPointer: (param: number | ((prev: number) => number)) => void;
  listLength: number;
};

const WeatherOverlayButtons = ({ pointer, setPointer, listLength }: Props) => (
  <>
    <WeatherScrollerOverlayButton
      direction="previous"
      onClick={() => setPointer((prev: number) => prev - 1)}
      disabled={!pointer}
      ariaLabel="Previous Day"
    >
      <FaArrowLeft />
    </WeatherScrollerOverlayButton>
    <WeatherScrollerOverlayButton
      direction="next"
      onClick={() => setPointer((prev: number) => prev + 1)}
      disabled={pointer >= listLength - 1}
      ariaLabel="Next Day"
    >
      <FaArrowRight />
    </WeatherScrollerOverlayButton>
  </>
);

export default WeatherOverlayButtons;
