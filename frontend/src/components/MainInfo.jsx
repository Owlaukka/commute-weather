import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div(
  {
    height: '60rem',
    boxShadow: '0 0 5px 0 rgba(100, 100, 100, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ({ theme }) => ({ backgroundColor: theme.colors.black })
);

const MainInfo = () => {
  return (
    <Wrapper>
      <h1>Primary Content</h1>
    </Wrapper>
  );
};

export default MainInfo;
