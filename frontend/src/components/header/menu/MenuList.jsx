import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const List = styled.ul(
  {
    listStyle: 'none',
    padding: 0,
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    width: 'min(100vw, 45rem)',
    margin: '0 auto',
    transition: 'left 500ms',
    '> *': {
      flex: 1,
    },
  },
  ({ theme, open }) => ({
    backgroundColor: theme.colors.white,
    backgroundImage: theme.colors.navBackgroundImage,
    boxShadow: `0 0 7px 5px ${theme.colors.gray2}`,
    color: theme.colors.black,
    height: theme.sizes.mobileNavbar,
    left: open ? 0 : '100%',
    transitionDelay: open ? '200ms' : 0,
  })
);

const ListLink = styled(NavLink)(
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
      backgroundColor: theme.colors.gray2,
      color: theme.colors.white,
    },
  })
);

const MenuList = ({ open }) => (
  <List open={open}>
    <li>
      <ListLink tabIndex={!open ? -1 : null} to="/" exact>
        Home
      </ListLink>
    </li>
    <li>
      <ListLink tabIndex={!open ? -1 : null} to="/register">
        Register
      </ListLink>
    </li>
    <li>
      <ListLink tabIndex={!open ? -1 : null} to="/login">
        Login
      </ListLink>
    </li>
  </List>
);

MenuList.propTypes = {
  open: PropTypes.bool,
};

MenuList.defaultProps = {
  open: false,
};

export default MenuList;
