import {List} from '../../interfaces/list';

export const filter = <T>(
  list: List<T>,
  filter: (item: T) => boolean
): List<T> =>
  Object.entries(list).reduce(
    (acc, [key, item]) => (filter(item) ? {...acc, [key]: item} : acc),
    {}
  );
