import styled from '@emotion/styled';
import { ThemeType } from '../../../theme';

const ModalBackground = styled.div(({ theme }: { theme: ThemeType }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `${theme.colors.black}AA`, // assumes HEX, prolly try to get something like polished to work later for this
}));

const ModalContent = styled.section(({ theme }: { theme: ThemeType }) => ({
  width: '40rem',
  maxWidth: '100vw',
  maxHeight: '100vh',
  background: theme.colors.darkVioletBG,
  padding: '1rem',
  '&:focus': {
    outline: `3px solid ${theme.colors.white}`,
  },
}));

export { ModalBackground, ModalContent };
