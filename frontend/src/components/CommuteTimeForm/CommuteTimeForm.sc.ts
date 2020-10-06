import React from 'react';
import styled from '@emotion/styled';
import media from 'css-in-js-media';

import { Button } from '../common/buttons';
import { ThemeType } from '../../theme';

const FormWrapper: React.FC<any> = styled.section(
  ({ theme, isOpen }: { theme: ThemeType; isOpen: boolean }) => ({
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: `${theme.sizes.commuteTimeFormHeight}rem`,
    top: isOpen ? 0 : `-${theme.sizes.commuteTimeFormHeight}rem`,
    transition: 'top 300ms',
  })
);

const Form = styled.form(({ theme }: { theme: ThemeType }) => ({
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
  ({ theme, isOpen }: { theme: ThemeType; isOpen: boolean }) => ({
    marginLeft: 'auto',
    transition: 'top 300ms',
    position: 'relative',
    top: isOpen ? 0 : `${theme.sizes.commuteTimeFormHeight}rem`,
    fontSize: '1.5rem',
    svg: {
      transition: 'transform 200ms',
      transform: isOpen ? 'none' : 'rotateX(145deg)',
    },
  })
);

export { FormWrapper, Form, ToggleFormButton };
