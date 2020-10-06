import styled from '@emotion/styled';
import media from 'css-in-js-media';

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
      marginTop: '4rem',
      scrollMarginTop: '3rem',
    },
    '&:last-of-type': {
      marginBottom: '4rem',
      scrollMarginBottom: '3rem',
    },
    scrollSnapAlign: 'start',
    scrollMarginBottom: '10rem',
  },
});

export { Scroller, CardWrapper };
