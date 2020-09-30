type DebounceType = (
  func: (...args: any[]) => void,
  wait: number
) => (...args: any[]) => any;

const debounce: DebounceType = (func, wait) => {
  let timeout: any; // TODO: something else?
  return (...args) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
};

export default debounce;
