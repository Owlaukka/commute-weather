import { getBreakPoints } from 'css-in-js-media';

const isPhone = () => window.innerWidth < getBreakPoints().tablet;

const isTablet = () =>
  window.innerWidth >= getBreakPoints().tablet &&
  window.innerWidth < getBreakPoints().desktop;

const isDesktop = () => window.innerWidth >= getBreakPoints().desktop;

export { isPhone, isTablet, isDesktop };
