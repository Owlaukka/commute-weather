import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import MenuButton from './menu/MenuButton';
import HeaderTitle from './HeaderTitle';

const HeaderWrapper = styled.header(
  {
    width: '100%',
    position: 'fixed',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    transition: 'filter 500ms',
  },
  ({ theme, open }) => ({
    height: theme.sizes.mobileNavbar,
    backgroundImage: `linear-gradient(to left, ${theme.colors.black}, ${theme.colors.white})`,
    boxShadow: `0 0 5px 1px ${theme.colors.black}`,
    filter: open ? 'blur(2px)' : 'none',
  })
);

const Header = () => {
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
      <HeaderWrapper open={open}>
        <HeaderTitle>Commute-weather</HeaderTitle>
      </HeaderWrapper>
      <nav>
        <MenuButton open={open} setOpen={setOpen} />
      </nav>
    </>
  );
};

export default Header;
