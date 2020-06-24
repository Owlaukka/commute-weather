import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div(
  {
    height: '80rem',
    width: 'min(100vw, 45rem)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: `0 auto`,
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.black,
    boxShadow: `0 0 15px 0px ${theme.colors.black}`,
  })
);

const MainInfo = () => (
  <Wrapper>
    <h1>Primary Content</h1>
  </Wrapper>
);

export default MainInfo;
