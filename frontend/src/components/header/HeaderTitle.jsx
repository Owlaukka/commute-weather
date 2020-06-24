import React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1(
  {
    margin: 0,
    zIndex: 1,
    padding: '0 1rem',
  },
  ({ theme }) => ({ color: theme.colors.black })
);

const HeaderTitle = () => <Title>Commute?</Title>;

export default HeaderTitle;
