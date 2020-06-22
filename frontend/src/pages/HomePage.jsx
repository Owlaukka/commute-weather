import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import MainInfo from '../components/MainInfo';

const HomePage = () => {
  const theme = useTheme();

  return (
    <>
      <main
        css={css`
          margin-top: 2rem;
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
