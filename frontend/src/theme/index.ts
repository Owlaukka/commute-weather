import colors, { ThemeColors } from './colors';
import sizes, { ThemeSizes } from './sizes';

export interface ThemeType {
  colors: ThemeColors;
  sizes: ThemeSizes;
}

const theme: ThemeType = {
  colors,
  sizes,
};

export default theme;
