import React, { createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { normalize } from 'polished';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Header from './components/header';

const Main = styled.main(
  {
    overflow: 'auto',
  },
  ({ theme }) => ({
    marginTop: theme.sizes.mobileNavbar,
    height: `calc(100vh - ${theme.sizes.mobileNavbar})`,
  })
);

const App = () => {
  const theme = useTheme();

  return (
    <>
      <Global
        styles={css`
          ${normalize()}
          @import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Lemonada:wght@300;400;500;600;700&display=swap');

          * {
            box-sizing: border-box;
          }
          body {
            font-family: 'Heebo', sans-serif;
            color: ${theme.colors.white};
            background-color: ${theme.colors.background};
            background-image: ${theme.colors.backgroundImage};
          }
          h1,
          h2 {
            font-family: 'Lemonada', cursive;
          }
        `}
      />
      <Header />
      <Main>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          {/* Default route if nothing else matches */}
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Main>
    </>
  );
};

export default App;
