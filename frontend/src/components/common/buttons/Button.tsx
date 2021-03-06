import React from 'react';
import styled from '@emotion/styled';

const StyledButton: React.FC<any> = styled.button({
  height: '100%',
  minHeight: '2rem',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'white',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  '&:disabled': {
    color: 'gray',
    pointerEvents: 'none',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 3px white inset',
  },
  '& > *': {
    transition: 'transform 300ms',
  },
  '&:active:not(:disabled)': {
    '& > *': {
      transform: 'scale(0.8)',
    },
  },
});

const InnerItem = styled.div({
  height: '100%',
  width: '100%',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 1rem',
});

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  title?: string | null;
  tabIndex?: number | string | null;
  children: React.ReactChild;
};

const Button = React.forwardRef(
  (
    {
      onClick,
      type = 'button',
      disabled = false,
      className = '',
      ariaLabel = '',
      title = null,
      tabIndex = null,
      children,
    }: ButtonProps,
    ref
  ) => (
    <StyledButton
      {...{ ref, type, onClick, disabled, className, title, tabIndex }}
      aria-label={ariaLabel}
    >
      <InnerItem tabIndex={-1}>{children}</InnerItem>
    </StyledButton>
  )
);

export default Button;
