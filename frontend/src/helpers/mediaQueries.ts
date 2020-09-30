import { getBreakPoints } from 'css-in-js-media';

const isPhone = (): boolean => window.innerWidth < getBreakPoints().tablet!;

const isTablet = (): boolean =>
  window.innerWidth >= getBreakPoints().tablet! &&
  window.innerWidth < getBreakPoints().desktop!;

const isDesktop = (): boolean => window.innerWidth >= getBreakPoints().desktop!;

export { isPhone, isTablet, isDesktop };
