import {List} from '../../interfaces/list';

export const map = <T, TFunction extends (item: T) => any>(
  items: List<T>,
  fn: TFunction
): List<ReturnType<TFunction>> =>
  Object.entries(items).reduce(
    (acc, [key, item]) => ({...acc, [key]: fn(item)}),
    {}
  );
