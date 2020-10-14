import React, { useState, useEffect, useRef, useCallback } from 'react';

import debounce from '../../../helpers/debounce';
import { isPhone } from '../../../helpers/mediaQueries';
import WeatherInfoCard from '../WeatherCard/WeatherInfoCard';
import WeatherOverlayButtons from './CarouselNavigationButtons/WeatherOverlayButtons';
import useScrollListener from './useScrollListener';
import { Scroller, CardWrapper } from './WeatherInfoCarousel.sc';
import { WeatherType } from '../../../NetworkRequestService/types';

type WeatherInfoCarouselProps = {
  toggleFormVisible: (arg: boolean | ((prev: boolean) => boolean)) => void;
  list: WeatherType[];
};

// TODO: add swipe gestures
const WeatherInfoCarousel = ({
  toggleFormVisible,
  list,
}: WeatherInfoCarouselProps) => {
  const [pointer, setPointer] = useState(0);
  const [isMobile, setIsMobile] = useState(isPhone());
  const pointerRef = useRef(pointer);
  const cardRefs = useRef<HTMLElement[]>([]);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const addCardRef = useCallback((card: HTMLElement | null, i: number) => {
    if (card) cardRefs.current[i] = card;
  }, []);

  useScrollListener(scrollerRef, toggleFormVisible);

  useEffect(() => {
    const scrollToActive = () =>
      cardRefs.current[pointerRef.current].scrollIntoView({
        inline: 'center',
      });

    scrollToActive();
    const debouncedOnResize: () => void = debounce(() => {
      setIsMobile(isPhone());
      scrollToActive();
    }, 100);

    window.addEventListener('resize', debouncedOnResize);
    return () => {
      window.removeEventListener('resize', debouncedOnResize);
    };
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
      <Scroller ref={scrollerRef}>
        {list.map((item, i) => (
          <CardWrapper key={item.time}>
            <WeatherInfoCard
              ref={(cardRef) => addCardRef(cardRef, i)}
              weather={item}
            />
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

export default WeatherInfoCarousel;
