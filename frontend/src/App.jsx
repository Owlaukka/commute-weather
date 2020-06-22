import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { normalize } from 'polished';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import MenuButton from './components/menu/MenuButton';

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
          }
          h1 {
            font-family: 'Lemonada', cursive;
            color: ${theme.colors.white};
          }
        `}
      />
      <div
        css={css`
          width: min(100vw, 45rem);
          margin: 0 auto;
        `}
      >
        <header>
          <MenuButton />
        </header>
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
      </div>
    </>
  );
};

export default App;
