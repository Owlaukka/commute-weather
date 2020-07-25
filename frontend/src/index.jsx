import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

import App from './App';
import theme from './theme';

const node = document.createElement('div');
document.body.prepend(node);

ReactDom.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  node
);
