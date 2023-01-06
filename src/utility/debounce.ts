export const debounce = (fun: Function, delay = 500) => {
  let timeout: any;
  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fun.call(null, ...args);
    }, delay);
  };
};
