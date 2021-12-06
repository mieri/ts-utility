import {List} from '../../interfaces/list';

export const map = <T, F extends (item: T) => any>(
  items: List<T>,
  fn: F
): List<ReturnType<F>> =>
  Object.entries(items).reduce((acc, [key, item]) => {
    return {...acc, [key]: fn(item)};
  }, {});
