type SortByFunction<T> = ((item: T) => string) | ((item: T) => number);
type SortOrder = 'asc' | 'desc';

export const asc = <T>(
  sortBy: SortByFunction<T>
): [SortByFunction<T>, SortOrder] => [sortBy, 'asc'];
export const desc = <T>(
  sortBy: SortByFunction<T>
): [SortByFunction<T>, SortOrder] => [sortBy, 'desc'];

export const simpleSort = <T>(
  list: T[],
  ...sortByList: Array<SortByFunction<T> | [SortByFunction<T>, SortOrder]>
): T[] => {
  const sortByListWithOrder = sortByList.map(
    (sortBy): [SortByFunction<T>, SortOrder] => {
      return Array.isArray(sortBy) ? sortBy : [sortBy, 'asc'];
    }
  );
  const indexAndValuesList: Array<[number, ...(string | number)[]]> = list.map(
    (item, index) => [
      index,
      ...sortByListWithOrder.map(([sortBy]) => sortBy(item)),
    ]
  );

  indexAndValuesList.sort((a, b) => {
    for (let i = 0; i < sortByListWithOrder.length; i++) {
      const aValue = a[i + 1];
      const bValue = b[i + 1];
      const sortAscending = sortByListWithOrder[i][1] !== 'desc';

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

  return indexAndValuesList.map(([index]) => list[index]);
};
