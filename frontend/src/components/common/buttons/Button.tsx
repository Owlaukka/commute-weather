import React from 'react';
import styled from '@emotion/styled';

const StyledButton: React.FC<any> = styled.button({
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
});

const InnerItem = styled.div({
  height: '100%',
  width: '100%',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

type ButtonProps = {
  onClick: (e: React.MouseEventHandler) => void;
  type?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  children: Node;
};

const Button = ({
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ariaLabel = '',
  children,
}: ButtonProps) => (
  <StyledButton
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
    aria-label={ariaLabel}
  >
    <InnerItem tabIndex={-1}>{children}</InnerItem>
  </StyledButton>
);

export default Button;
