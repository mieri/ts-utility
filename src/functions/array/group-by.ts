export const groupBy = <T, U extends string | number>(
  list: T[],
  getter: (item: T) => U
): Partial<Record<U, T[]>> => {
  const grouped: Partial<Record<U, T[]>> = {};
  list.forEach(item => {
    const by = getter(item);
    grouped[by] = [...(grouped[by] ?? []), item];
  });
  return grouped;
};
