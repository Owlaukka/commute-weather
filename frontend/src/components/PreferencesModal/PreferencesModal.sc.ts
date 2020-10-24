import styled from '@emotion/styled';
import { ThemeType } from '../../theme';

export const Fieldset = styled.fieldset({
  marginBottom: '1rem',
  border: 'none',
  background: 'rgba(0,0,0,0.2)',
  borderRadius: '0.5rem',
  boxShadow: '0 3px 6px 0 rgba(0,0,0,0.5)',
  legend: {
    fontSize: '1.5rem',
  },
});

export const Input = styled.input({
  width: '100%',
  marginBottom: '1rem',
});

export const RangeInput = styled(Input)(({ theme }: { theme: ThemeType }) => ({
  appearance: 'none',
  height: '2px',
  outline: 'none',
  opacity: 0.5,
  transition: 'opacity 200ms, background-color 200ms, height 200ms',
  borderRadius: '5px',
  '&::-webkit-slider-thumb': {
    appearance: 'none',
    width: theme.sizes.sliderThumbSize.value + theme.sizes.sliderThumbSize.unit,
    height:
      theme.sizes.sliderThumbSize.value + theme.sizes.sliderThumbSize.unit,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: theme.colors.black,
  },
  '&::-moz-range-thumb': {
    appearance: 'none',
    width: theme.sizes.sliderThumbSize.value + theme.sizes.sliderThumbSize.unit,
    height:
      theme.sizes.sliderThumbSize.value + theme.sizes.sliderThumbSize.unit,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: theme.colors.black,
  },
  '&:hover, &:focus': {
    opacity: 1,
  },
  '&:focus': {
    height: '5px',
    '&::-webkit-slider-thumb': {
      backgroundColor: theme.colors.white,
    },
    '&::-moz-range-thumb': {
      backgroundColor: theme.colors.white,
    },
  },
}));
