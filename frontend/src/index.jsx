import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import App from './App';
import theme from './theme';

dayjs.extend(utc);

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

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//     try {
//       await navigator.serviceWorker.register('./sw.js');
//     } catch (regError) {
//       // eslint-disable-next-line no-console
//       console.error('SW registration failed: ', regError);
//     }
//   });
// }
