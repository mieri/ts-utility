import {AnyFn} from '../../types';

export function memoize<Fn extends AnyFn>(fn: Fn) {
  const returned: {[key: string]: ReturnType<Fn>} = {};
  return (...args: Parameters<Fn>): ReturnType<Fn> => {
    const key = JSON.stringify(args);
    return (returned[key] = returned[key] ?? fn(args));
  };
}
