import {Fn} from '../../types';

export function times<T>(n: number, fn: Fn<[unknown, number, unknown[]], T>) {
  return Array(Math.max(0, n)).fill(0).map(fn);
}
