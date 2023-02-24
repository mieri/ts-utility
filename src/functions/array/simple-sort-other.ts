type SortByFunction<T> = ((item: T) => string) | ((item: T) => number);
type SortOrder = 'asc' | 'desc';

export const asc = <T>(
  sortBy: SortByFunction<T>
): [SortByFunction<T>, SortOrder] => [sortBy, 'asc'];
export const desc = <T>(
  sortBy: SortByFunction<T>
): [SortByFunction<T>, SortOrder] => [sortBy, 'desc'];

export const simpleSortOther = <T extends object>(
  list: T[],
  ...sortByList: Array<SortByFunction<T> | [SortByFunction<T>, SortOrder]>
): T[] => {
  if (!sortByList?.length) return [...list];

  const sortByListWithOrder: [SortByFunction<T>, SortOrder][] = sortByList.map(
    sortBy => {
      return Array.isArray(sortBy) ? sortBy : [sortBy, 'asc'];
    }
  );
  const values = new WeakMap<T, Array<string | number>>(
    list.map(i => [i, Array.from(Array(sortByList.length))])
  );

  return [...list].sort((a, b) => {
    for (let i = 0; i < sortByListWithOrder.length; i++) {
      const [sortBy, order] = sortByListWithOrder[i];
      const aArray = values.get(a) as (string | number)[];
      const bArray = values.get(b) as (string | number)[];
      const aValue = aArray[i] ?? (aArray[i] = sortBy(a));
      const bValue = bArray[i] ?? (bArray[i] = sortBy(b));
      const sortAscending = order !== 'desc';

      let result = 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        result = sortAscending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = sortAscending ? aValue - bValue : bValue - aValue;
      }

      if (result === 0) continue;

      return result;
    }
    return 0;
  });
};
