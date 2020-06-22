import React, { useState } from 'react';
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
    background: 'transparent',
    borderRadius: '50%',
    transition: 'top 500ms',
    cursor: 'pointer',
  },
  ({ open }) => ({ top: open ? '3rem' : 0 })
);

const MenuButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <MenuList />}
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
