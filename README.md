# ts-utility

Simple utility functions

## Array functions

### groupBy

A small implemententation of groupBy

```typescript
type specificGroupNames = 'first' | 'second' | 'third';
const itemsWithSpecificGroups = items as Array<{
  id: number;
  group: specificGroupNames;
}>;

const result = groupBy(itemsWithSpecificGroups, item => item.group);
// result now contains the grouped arrays.
// typescript error occurs if you try to access result.noneexisting since its not in the group names
```

### simpleSort

Sorts an array using supplied functions to get values to sort by.
Takes functions returning either strings or numbers.

Example test case:

```typescript
it('should sort pokemons on first letter of name and then by weight, descending ', () => {
  const result = simpleSort(
    json.pokemon,
    asc(i => i.name[0]),
    desc(i => Number.parseFloat(i.weight))
  );

  // Below would give the same result.
  // asc|desc functions above actually just returns this type of tuple.
  const result = simpleSort(
    json.pokemon,
    [i => i.name[0], 'asc'],
    [i => Number.parseFloat(i.weight), 'desc']
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
```

For more examples see tests
