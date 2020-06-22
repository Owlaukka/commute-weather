import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { lighten } from 'polished';

const List = styled.ul(
  {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    width: '100%',
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.darkVioletBG,
    height: theme.sizes.mobileNavbar,
  })
);

const ListLink = styled.a(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: 'inherit',
    textDecoration: 'none',
  },
  ({ theme }) => ({
    '&.active': {
      backgroundColor: lighten(0.2, theme.colors.darkVioletBG),
    },
  })
);

const MenuButton = () => (
  <List>
    <li>
      {/* active matches everything here... */}
      <NavLink to="/" activeClassName="active" component={ListLink}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/register" component={ListLink}>
        Register
      </NavLink>
    </li>
    <li>
      <NavLink to="/login" component={ListLink}>
        Login
      </NavLink>
    </li>
  </List>
);

export default MenuButton;
