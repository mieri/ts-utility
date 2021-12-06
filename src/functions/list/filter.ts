import {List} from '../../interfaces/list';

export const filter = <T>(
  list: List<T>,
  filter: ([key, value]: [string, T]) => boolean
): List<T> =>
  Object.entries(list)
    .filter(filter)
    .reduce((acc, [key, item]) => ({...acc, [key]: item}), {});
