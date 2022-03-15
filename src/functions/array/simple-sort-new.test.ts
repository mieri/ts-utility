import {asc, desc, simpleSortNew as simpleSort} from './simple-sort-new';
import json from './test-data.json';

describe('simpleSortNew', () => {
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
      [i => i.amount, 'desc'],
      [i => i.name, 'desc']
    );

    expect(result.map(i => `${i.amount}, ${i.name}`)).toEqual([
      '57632, markus',
      '262, sara',
      '122, theodor',
      '52, carola',
      '23, sven',
      '1, tomas',
      '1, rickard',
      '1, maria',
      '1, bertil',
      '1, anders',
    ]);
  });

  it('should return a new array', () => {
    const result = simpleSort(unsortedObjects, i => i.amount);

    expect(result).not.toBe(unsortedObjects);
  });

  it('should not shift order when types are different', () => {
    const a = [...unsortedObjects, {amount: 1, name: 1}];
    const result = simpleSort(a, [i => i.name as string, 'desc']);

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
    const result = simpleSort(unsortedObjects, [i => i.name, 'desc']);

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
    const result = simpleSort(unsortedObjects, [i => i.name, undefined]);

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

  it('should sort pokemons on first letter of name and then by weight, descending ', () => {
    const result = simpleSort(
      json.pokemon,
      asc(i => i.name[0]), // Names first letter
      desc(i => Number.parseFloat(i.weight)) // Weight
    );

    expect(result.slice(0, 10).map(i => `${i.name} ${i.weight}`)).toEqual([
      'Arcanine 155.0 kg',
      'Arbok 65.0 kg',
      'Aerodactyl 59.0 kg',
      'Articuno 55.4 kg',
      'Alakazam 48.0 kg',
      'Abra 19.5 kg',
      'Blastoise 85.5 kg',
      'Butterfree 32.0 kg',
      'Beedrill 29.5 kg',
      'Bulbasaur 6.9 kg',
    ]);
  });
});
