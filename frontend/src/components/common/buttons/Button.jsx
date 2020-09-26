import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledButton = styled.button({
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

const Button = ({
  onClick,
  type,
  disabled,
  className,
  ariaLabel,
  children,
}) => (
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

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  className: '',
  ariaLabel: null,
};

export default Button;
