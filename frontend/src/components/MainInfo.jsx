import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div(
  {
    height: '60rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.black,
    boxShadow: `0 0 15px 0px ${theme.colors.white}`,
  })
);

const MainInfo = () => {
  return (
    <Wrapper>
      <h1>Primary Content</h1>
    </Wrapper>
  );
};

export default MainInfo;
