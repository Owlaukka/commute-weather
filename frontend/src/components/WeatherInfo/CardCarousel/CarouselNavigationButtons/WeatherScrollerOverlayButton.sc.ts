import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import media from 'css-in-js-media';

import { Button } from '../../../common/buttons';

const hover = keyframes({
  from: {
    clipPath: 'circle(5%)',
    backgroundColor: 'rgba(50, 50, 50, 0)',
  },
  to: {
    clipPath: 'circle(75%)',
    backgroundColor: 'rgba(50, 50, 50, 0.4)',
  },
});

const OverlayButton = styled(Button)(
  ({ direction }: { direction: string }): {} => ({
    fontSize: '2.5rem',
    width: '100%',
    position: 'fixed',
    padding: 0,
    height: '8rem',
    svg: {
      transition: 'transform 200ms',
    },
    '&:active:not(:disabled)': {
      svg: {
        transform: 'scale(0.8)',
      },
    },
    ...(direction === 'previous' ? { top: 0 } : { bottom: 0 }),
    [media('>=tablet')]: {
      ...(direction === 'previous' ? { left: 0 } : { right: 0 }),
      bottom: 0,
      top: 'initial',
      width: 'min(25rem, 20vw)',
      fontSize: '4rem',
    },
    // TODO: add a better hover check
    [media('>=desktop')]: {
      height: '100%',
      transition: 'opacity 300ms',
      top: 0,
      opacity: 0.1,
      '&:not(:disabled):hover': {
        opacity: 1,
        '& > *': {
          animation: `${hover} 500ms forwards`,
        },
      },
    },
  })
);

export default OverlayButton;
