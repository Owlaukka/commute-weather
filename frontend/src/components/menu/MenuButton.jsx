import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import Hamburger from './HamburgerStyled';
import MenuList from './MenuList';

const Button = styled.button(
  {
    position: 'fixed',
    right: '0.4rem',
    width: '3rem',
    height: '3rem',
    padding: 0,
    border: 'none',
    transition: 'top 500ms, background-color 600ms',
    cursor: 'pointer',
  },
  ({ open, theme }) => ({
    top: open ? '3rem' : 0,
    transitionDelay: open ? 0 : '100ms',
    backgroundColor: open ? theme.colors.gray3 : 'transparent',
  })
);

const MenuButton = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unlistenToHistory = history.listen(() => {
      setOpen(false);
    });

    return unlistenToHistory;
  }, []);

  return (
    <>
      <MenuList open={open} setOpen={setOpen} />
      <Button
        aria-label="hamburger-menu"
        type="button"
        onClick={() => setOpen(!open)}
        open={open}
      >
        <Hamburger open={open} />
      </Button>
    </>
  );
};

export default MenuButton;
