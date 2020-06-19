import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

import App from './App';

const node = document.createElement('div');
document.body.prepend(node);

// TODO: put in it's own file
const theme = {
  colors: {
    gray: '#3D3D3D',
    gray2: '#292929',
    gray3: '#141414',
    black: '#0A0A0A',
    white: '#F4F0FA',

    darkBackground: '#151514',
    background: '#292929',
    darkVioletBG: '#463548',
    violetBG: '#523857',
  },
};

ReactDom.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  node
);
