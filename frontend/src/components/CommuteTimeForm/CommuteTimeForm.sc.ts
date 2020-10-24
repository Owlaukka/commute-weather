import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import media from 'css-in-js-media';

import { Button } from '../common/buttons';
import { ThemeType } from '../../theme';

const outlineFlash = keyframes({
  '0%': {
    outlineColor: '#FFF',
  },
  '50%': {
    outlineColor: 'rgba(255, 255, 255, 0.3)',
  },
  '100%': {
    outlineColor: '#FFF',
  },
});

const NavbarWrapper: React.FC<any> = styled.section(
  ({ isOpen }: { isOpen: boolean }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
    transition: 'transform 300ms',
    zIndex: 1,
    [media('<tablet')]: {
      position: 'sticky',
    },
  })
);

const Navbar = styled.div(({ theme }: { theme: ThemeType }) => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.colors.black,
  boxShadow: `0 0 12px 2px ${theme.colors.black}`,
  minHeight: '3rem',
  [media('<tablet')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ToggleNavbarButton: React.FC<any> = styled(Button)(
  ({ theme, isOpen }: { theme: ThemeType; isOpen: boolean }) => ({
    marginLeft: 'auto',
    transition: 'transform 300ms',
    position: 'relative',
    transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
    fontSize: '1.5rem',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      height: '0.25rem',
      width: '0.8rem',
      backgroundColor: theme.colors.white,
      transition: 'transform 300ms, background-color 300ms',
      borderRadius: '1px',
    },
    '&:before': {
      left: '0.4rem',
      transform: isOpen ? 'rotate(-45deg)' : 'rotate(45deg)',
    },
    '&:after': {
      right: '0.4rem',
      transform: isOpen ? 'rotate(45deg)' : 'rotate(-45deg)',
    },
    '&:hover': {
      transform: isOpen
        ? 'translateY(0%) scale(1.2)'
        : 'translateY(100%) scale(1.2)',
      '&:before, &:after': {
        backgroundColor: '#AAA',
      },
    },
  })
);

const CommuteTimeFormElement = styled.form({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const CommuteTimeInputWrapper = styled.label({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '1rem',
});

const CommuteTimeInputElement = styled.input(
  ({ theme }: { theme: ThemeType }) => ({
    border: 'none',
    borderRadius: '3px',
    backgroundColor: theme.colors.darkVioletBG,
    color: theme.colors.white,
    fontStyle: 'italic',
    '&:focus': {
      outline: 'solid 3px',
      animation: `${outlineFlash} 1000ms ease infinite`,
    },
  })
);

const CommuteTimeFormSubmitButton = styled(Button)({
  height: '3rem',
});

export {
  NavbarWrapper,
  Navbar,
  ToggleNavbarButton,
  CommuteTimeFormElement,
  CommuteTimeInputWrapper,
  CommuteTimeInputElement,
  CommuteTimeFormSubmitButton,
};
