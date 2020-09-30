import React, { useEffect, useRef } from 'react';
import debounce from '../../../helpers/debounce';

const useScrollListener = (
  scrollerRef: React.RefObject<HTMLElement>,
  callback: (arg: boolean) => void
): void => {
  const prevScrollPosition = useRef(0);
  useEffect(() => {
    // TODO: change to throttle (gotta make one first) or add an "immediate" option to debounce to trigger once on the leading edge
    const checkScroll = debounce(() => {
      if (!scrollerRef?.current) return;
      const curScroll = scrollerRef.current.scrollTop;
      const scrollDifference = curScroll - prevScrollPosition.current;
      prevScrollPosition.current = curScroll;

      if (curScroll < 200) {
        callback(true);
        return;
      }
      if (Math.abs(scrollDifference) < 100) return;

      if (scrollDifference < 0) callback(true);
      else callback(false);
    }, 50);

    const elem = scrollerRef.current;
    if (!elem) return undefined;
    elem.addEventListener('scroll', checkScroll, { passive: true });
    return () => elem.removeEventListener('scroll', checkScroll);
  }, [scrollerRef, callback]);
};

export default useScrollListener;
