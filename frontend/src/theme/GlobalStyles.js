import { css } from '@emotion/core';
import { normalize } from 'polished';

const GlobalStyles = (theme) => css`
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
`;

export default GlobalStyles;
