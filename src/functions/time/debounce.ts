import {Fn as AnyFn} from '../../types/any-fn';

export function debounce<Fn extends AnyFn>(fn: Fn, time = 0) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<Fn>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), time);
  };
}
