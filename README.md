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

Alternatively functions can return a tuple of [string or number, 'asc' | 'desc'].
There are shorthand functions for a slightly cleaner look.
Otherwise sortOrder will be ascending.  

Example case:
Sort an array of objects primarily on sortOrder property and secondly on text property descending.

```typescript
const list: {text:string, sortOrder:number}[] = [...];
const sortedList = simpleSort(
  list,
  i => i.sortOrder,
  i => desc(i.text)
); // sorts by sortOrder ascending and then by text descending
```

Same result but more explicit:

```typescript
const list: {text:string, sortOrder:number}[] = [...];
const sortedList = simpleSort(
  list,
  i => asc(i.sortOrder),
  i => desc(i.text)
); // sorts by sortOrder ascending and then by text descending
```

sortedList could after this be something like:

```typescript
[
    { sortOrder: 1, text: 'second' },
    { sortOrder: 1, text: 'first' },
    { sortOrder: 1, text: 'fifth' },
    { sortOrder: 2, text: 'third' },
    { sortOrder: 3, text: 'fourth' }
]
```

For more examples see tests
