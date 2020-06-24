import styled from '@emotion/styled';

const Hamburger = styled.div(
  {
    position: 'relative',
    height: '10%',
    margin: '0 0.5rem',
    transition: 'background-color 500ms',
    '&, ::before, ::after': {
      left: 0,
      borderRadius: '1px',
    },
    '::before, ::after': {
      content: '""',
      position: 'absolute',
      height: '100%',
      width: '100%',
      transition: 'transform 500ms',
    },
    '::before': {
      top: '-0.5rem',
    },
    '::after': {
      top: '0.5rem',
    },
  },
  ({ open, theme }) => ({
    backgroundColor: open ? 'transparent' : theme.colors.white,
    '::before, ::after': {
      backgroundColor: theme.colors.white,
    },
    '::before': {
      transform: open && 'translateY(0.5rem) rotate(45deg)',
    },
    '::after': {
      transform: open && 'translateY(-0.5rem) rotate(-45deg)',
    },
  })
);

export default Hamburger;
