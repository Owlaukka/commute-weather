import React from 'react';

import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const wrapperStyles = css({
  height: '60rem',
  boxShadow: '0 0 5px 0 rgba(255, 255, 255, 0.5)',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '40rem',
});

const MainInfo = () => {
  const theme = useTheme();

  return (
    <div
      css={css([wrapperStyles, css({ backgroundColor: theme.colors.black })])}
    >
      <h1>Primary Content</h1>
    </div>
  );
};

export default MainInfo;
