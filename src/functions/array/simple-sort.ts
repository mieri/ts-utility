export const simpleSort = <T>(
  list: T[],
  ...sortByList: Array<
    | ((item: T) => string | [string, 'asc' | 'desc' | undefined])
    | ((item: T) => number | [number, 'asc' | 'desc' | undefined])
  >
) => {
  const sortOrderList = sortByList.map(sortBy => {
    const value = sortBy(list[0]);
    return Array.isArray(value) ? value[1] : 'asc';
  });
  const mapped: Array<[number, ...(string | number)[]]> = list.map(
    (item, index) => [
      index,
      ...sortByList
        .map(sortBy => {
          const result = sortBy(item);
          return Array.isArray(result) ? result[0] : result;
        })
        .reverse(),
    ]
  );

  sortByList.forEach((_item, index) => {
    const sortOrder = sortOrderList[index] ?? 'asc';
    mapped.sort((a, b) => {
      const aValue = a[index + 1];
      const bValue = b[index + 1];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortOrder === 'asc') return aValue.localeCompare(bValue);
        return bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (sortOrder === 'asc') return aValue - bValue;
        return bValue - aValue;
      }
      return 0;
    });
  });

  return mapped.map(([index]) => list[index]);
};
