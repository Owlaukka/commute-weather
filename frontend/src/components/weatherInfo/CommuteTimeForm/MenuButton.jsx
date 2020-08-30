import React, { useState } from 'react';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import Hamburger from './Hamburger.sc';
import CommuteTimeForm from './CommuteTimeForm';
import { Button } from '../../common/buttons';

const SettingsForm = styled.aside(({ open, theme }) => ({
  position: 'fixed',
  display: 'flex',
  width: '100%',
  backgroundColor: theme.colors.black,
  boxShadow: `0 0 15px 0px ${theme.colors.black}`,
  zIndex: 1,
  transition: 'left 500ms',
  left: open ? 0 : '105%',
  [media('>=desktop')]: {
    justifyContent: 'center',
  },
}));

const HamburgerButton = styled(Button)(({ open }) => ({
  position: 'fixed',
  right: '1rem',
  width: '3rem',
  height: '3rem',
  transition: 'top 500ms, background-color 600ms',
  top: open ? '3.5rem' : '0.5rem',
  transitionDelay: open ? 0 : '100ms',
}));

const MenuButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <SettingsForm open={open}>
      <HamburgerButton
        aria-label="Open navigation"
        onClick={() => setOpen((prev) => !prev)}
        open={open}
      >
        <Hamburger open={open} />
      </HamburgerButton>
      <CommuteTimeForm open={open} />
    </SettingsForm>
  );
};

export default MenuButton;
