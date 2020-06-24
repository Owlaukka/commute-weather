import React from 'react';
import styled from '@emotion/styled';

import MenuButton from './menu/MenuButton';
import HeaderTitle from './HeaderTitle';

const HeaderWrapper = styled.header(
  {
    width: '100%',
    position: 'fixed',
    top: 0,
    display: 'flex',
    alignItems: 'center',
  },
  ({ theme }) => ({
    height: theme.sizes.mobileNavbar,
    backgroundImage: `linear-gradient(to left, ${theme.colors.black}, ${theme.colors.white})`,
    boxShadow: `0 0 5px 1px ${theme.colors.black}`,
  })
);

const Header = () => (
  <>
    <HeaderWrapper>
      <HeaderTitle>Commute-weather</HeaderTitle>
    </HeaderWrapper>
    <nav>
      <MenuButton />
    </nav>
  </>
);

export default Header;
