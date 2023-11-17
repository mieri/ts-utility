type Getter<T> = ((item: T) => string) | ((item: T) => number);
type SortOrder = 'asc' | 'desc';

export const asc = <T>(getter: Getter<T>): [Getter<T>, SortOrder] => [
  getter,
  'asc',
];
export const desc = <T>(getter: Getter<T>): [Getter<T>, SortOrder] => [
  getter,
  'desc',
];

export const simpleSort = <T>(
  list: T[],
  ...getterList: [Getter<T>, SortOrder][]
): T[] => {
  if (!getterList?.length) return [...list];

  const indexAndValuesList: Array<[number, ...(string | number)[]]> = list.map(
    (item, index) => [index, ...getterList.map(([sortBy]) => sortBy(item))]
  );

  indexAndValuesList.sort((a, b) => {
    for (let i = 0; i < getterList.length; i++) {
      const aValue = a[i + 1];
      const bValue = b[i + 1];
      const sortAscending = getterList[i][1] !== 'desc';

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
