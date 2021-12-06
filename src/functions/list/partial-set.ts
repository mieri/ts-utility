import {List} from '../../interfaces/list';

export function partialSet<T>(
  list: List<T>,
  input: Partial<T> | ((item: T) => Partial<T>)
): List<T> {
  return Object.entries(list).reduce((acc, [key, item]) => {
    const properties = typeof input === 'function' ? input(item) : input;
    return {...acc, [key]: {...item, ...properties}};
  }, list);
}
