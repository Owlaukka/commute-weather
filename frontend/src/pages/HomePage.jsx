import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import MainInfo from '../components/MainInfo';

const HomePage = () => {
  const theme = useTheme();

  return (
    <>
      <header
        css={css`
          position: fixed;
          top: 0;
          width: 100%;
        `}
      >
        <div
          css={css`
            background-color: ${theme.colors.gray};
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 1rem;
          `}
        >
          <h3>Navbar and menu</h3>
          <div>ham</div>
        </div>
      </header>
      <main
        css={css`
          margin-top: 3.5rem;
          padding: 1rem;
        `}
      >
        <MainInfo />
      </main>
      <footer>
        <div
          css={css`
            background-color: ${theme.colors.darkBackground};
            padding: 2rem;
          `}
        >
          Footer i guess
        </div>
      </footer>
    </>
  );
};

export default HomePage;
