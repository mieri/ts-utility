import {Fn} from '../../types';

export const ASC = Symbol('Sort ascending');
export const DESC = Symbol('Sort descending');
export type Order = typeof ASC | typeof DESC;

export const multiSort = <T>(
  list: T[],
  ...sortFns: Fn<[T, T], number>[]
): T[] => {
  return [...list].sort((a, b) => {
    let result = 0;
    for (let i = 0; i < sortFns.length; i++) {
      result = sortFns[i](a, b);
      if (result !== 0) return result;
    }
    return result;
  });
};

export const sortBy = {
  str:
    <T>(getter: Fn<[T], string>, order: Order = ASC) =>
    (a: T, b: T) =>
      getter(order === ASC ? a : b).localeCompare(
        getter(order === ASC ? b : a)
      ),

  num:
    <T>(getter: Fn<[T], number>, order: Order = ASC) =>
    (a: T, b: T) =>
      getter(order === ASC ? a : b) - getter(order === ASC ? b : a),
};
