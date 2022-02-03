import {desc, simpleSort} from './simple-sort';

describe('simpleSort', () => {
  const unsortedObjects = [
    {amount: 1, name: 'rickard'},
    {amount: 1, name: 'anders'},
    {amount: 1, name: 'bertil'},
    {amount: 23, name: 'sven'},
    {amount: 1, name: 'tomas'},
    {amount: 262, name: 'sara'},
    {amount: 1, name: 'maria'},
    {amount: 52, name: 'carola'},
    {amount: 57632, name: 'markus'},
    {amount: 122, name: 'theodor'},
  ];

  it('should sort list by amount then by name ascending', () => {
    const result = simpleSort(
      unsortedObjects,
      i => i.amount,
      i => i.name
    );

    expect(result).toEqual([
      {amount: 1, name: 'anders'},
      {amount: 1, name: 'bertil'},
      {amount: 1, name: 'maria'},
      {amount: 1, name: 'rickard'},
      {amount: 1, name: 'tomas'},
      {amount: 23, name: 'sven'},
      {amount: 52, name: 'carola'},
      {amount: 122, name: 'theodor'},
      {amount: 262, name: 'sara'},
      {amount: 57632, name: 'markus'},
    ]);
  });

  it('should sort list by number descending then name descending', () => {
    const result = simpleSort(
      unsortedObjects,
      i => desc(i.amount),
      i => desc(i.name)
    );

    expect(result).toEqual([
      {amount: 57632, name: 'markus'},
      {amount: 262, name: 'sara'},
      {amount: 122, name: 'theodor'},
      {amount: 52, name: 'carola'},
      {amount: 23, name: 'sven'},
      {amount: 1, name: 'tomas'},
      {amount: 1, name: 'rickard'},
      {amount: 1, name: 'maria'},
      {amount: 1, name: 'bertil'},
      {amount: 1, name: 'anders'},
    ]);
  });

  it('should return a new array', () => {
    const result = simpleSort(unsortedObjects, i => i.amount);

    expect(result).not.toBe(unsortedObjects);
  });

  it('should not shift order when types are different', () => {
    const a = [...unsortedObjects, {amount: 1, name: 1}];
    const result = simpleSort(a, i => desc(i.name as string));

    expect(result.map(i => i.name)).toEqual([
      'tomas',
      'theodor',
      'sven',
      'sara',
      'rickard',
      'markus',
      'maria',
      'carola',
      'bertil',
      'anders',
      1,
    ]);
  });

  it('should sort by name descending', () => {
    const result = simpleSort(unsortedObjects, i => desc(i.name));

    expect(result.map(i => i.name)).toEqual([
      'tomas',
      'theodor',
      'sven',
      'sara',
      'rickard',
      'markus',
      'maria',
      'carola',
      'bertil',
      'anders',
    ]);
  });

  it('should sort by name ascending', () => {
    const result = simpleSort(unsortedObjects, i => [i.name, undefined]);

    expect(result.map(i => i.name)).toEqual([
      'anders',
      'bertil',
      'carola',
      'maria',
      'markus',
      'rickard',
      'sara',
      'sven',
      'theodor',
      'tomas',
    ]);
  });
});
