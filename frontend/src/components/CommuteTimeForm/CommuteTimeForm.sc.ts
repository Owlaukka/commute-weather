import React from 'react';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import { Button } from '../common/buttons';

// TODO: move to somewhere shareable or attach to the theme object itself somehow....
type Theme = {
  sizes: any;
  colors: any;
};

type StyledCallback = {
  theme: Theme;
  isOpen?: boolean;
};

const FormWrapper: React.FC<any> = styled.section(
  ({ theme, isOpen }: StyledCallback) => ({
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: `${theme.sizes.commuteTimeFormHeight}rem`,
    top: isOpen ? 0 : `-${theme.sizes.commuteTimeFormHeight}rem`,
    transition: 'top 300ms',
  })
);

const Form = styled.form(({ theme }: StyledCallback) => ({
  padding: '0 1rem',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  background: theme.colors.black,
  boxShadow: `0 0 12px 2px ${theme.colors.black}`,
  [media('<tablet')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const ToggleFormButton: React.FC<any> = styled(Button)(
  ({ theme, isOpen }: StyledCallback) => ({
    height: '100%',
    marginLeft: 'auto',
    padding: '1rem',
    transition: 'top 300ms',
    position: 'relative',
    top: isOpen ? 0 : `${theme.sizes.commuteTimeFormHeight}rem`,
  })
);

export { FormWrapper, Form, ToggleFormButton };
