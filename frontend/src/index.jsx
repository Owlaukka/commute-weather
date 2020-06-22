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
    backgroundImage: 'radial-gradient(#292929 50%, #999 120%)',
    navBackgroundImage:
      'linear-gradient(to bottom right, #F4F0FA, #0A0A0A 250%)',
    background: '#292929',
    darkVioletBG: '#463548',
    violetBG: '#523857',
  },
  sizes: {
    mobileNavbar: '3rem',
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
