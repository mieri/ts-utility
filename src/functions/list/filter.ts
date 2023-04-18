import {List} from '../../interfaces/list';
import {AnyObject} from '../../types';

export const filter = <T extends AnyObject>(
  list: List<T>,
  filter: (item: T) => boolean
): List<T> =>
  Object.entries(list).reduce(
    // (acc, [key, item]) => (filter(item) ? {...acc, [key]: item} : acc),
    (acc, [key, item]) => {
      if (filter(item)) acc[key] = item;
      return acc;
    },
    {} as List<T>
  );
