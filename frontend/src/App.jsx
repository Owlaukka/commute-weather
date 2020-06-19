import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import normalize from 'normalize.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const theme = useTheme();

  return (
    <>
      <Global
        styles={css`
          ${normalize[0][1]}
          @import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Lemonada:wght@300;400;500;600;700&display=swap');

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
    </>
  );
};

export default App;
