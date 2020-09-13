import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import debounce from '../../../helpers/debounce';
import { isPhone } from '../../../helpers/mediaQueries';
import WeatherInfoCard from '../WeatherCard/WeatherInfoCard';
import WeatherOverlayButtons from './CarouselNavigationButtons/WeatherOverlayButtons';

const Scroller = styled.ul({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  height: '100%',
  display: 'flex',
  gap: '2rem',
  flexDirection: 'column',
  overflowY: 'auto',
  [media('>=tablet')]: {
    flexDirection: 'row',
    overflowY: 'initial',
  },
  [media('<=tablet')]: {
    // TODO: make a better scroll-snapper maybe with IntersectionObserver
    // so  scrolling to see content doesn't trigger a scroll if you go
    // just a bit below the required amount.
    scrollSnapType: 'y mandatory',
    scrollPaddingTop: '1rem',
  },
});

const CardWrapper = styled.li({
  display: 'flex',
  alignItems: 'center',
  [media('>=desktop')]: {
    '&:first-of-type': {
      marginLeft: '50vw',
    },
  },
  [media('<tablet')]: {
    '&:first-of-type': {
      marginTop: '3rem',
    },
    scrollSnapAlign: 'start',
    scrollMarginBottom: '10rem',
  },
});

// TODO: add swipe gestures
const WeatherInfoCarousel = ({ list }) => {
  const [pointer, setPointer] = useState(0);
  const [isMobile, setIsMobile] = useState(isPhone());
  const pointerRef = useRef(pointer);
  const cardRefs = useRef([]);

  const addCardRef = useCallback((card, i) => {
    cardRefs.current[i] = card;
  }, []);

  useEffect(() => {
    const scrollToActive = () =>
      cardRefs.current[pointerRef.current].scrollIntoView({
        inline: 'center',
      });

    scrollToActive();
    const debouncedOnResize = debounce(() => {
      setIsMobile(isPhone());
      scrollToActive();
    }, 100);

    window.addEventListener('resize', debouncedOnResize);
    return () => window.removeEventListener('resize', debouncedOnResize);
  }, []);

  useEffect(() => {
    pointerRef.current = pointer;
    cardRefs.current[pointer].scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  }, [pointer]);

  useEffect(() => {
    setPointer(0);
  }, [list]);

  return (
    <>
      <Scroller>
        {list.map((item, i) => (
          <CardWrapper key={item.time}>
            <WeatherInfoCard ref={(ref) => addCardRef(ref, i)} weather={item} />
          </CardWrapper>
        ))}
      </Scroller>

      {!isMobile && (
        <WeatherOverlayButtons
          pointer={pointer}
          setPointer={setPointer}
          listLength={list.length}
        />
      )}
    </>
  );
};

WeatherInfoCarousel.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
};

WeatherInfoCarousel.defaultProps = {
  list: [],
};

export default WeatherInfoCarousel;
