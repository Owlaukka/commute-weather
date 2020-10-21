import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import App from './App';
import theme from './theme';

dayjs.extend(utc);

const appRoot = document.getElementById('js-app');

ReactDom.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  appRoot
);
