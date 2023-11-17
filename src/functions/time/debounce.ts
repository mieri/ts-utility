import {AnyFn} from '../../types';

export function debounce<Fn extends AnyFn>(fn: Fn, time = 0) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<Fn>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), time);
  };
}
