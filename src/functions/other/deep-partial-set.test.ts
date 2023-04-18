import {deepPartialSet} from './deep-partial-set';

describe('Function deepPartialSet', () => {
  it('should only change supplied properties', () => {
    const initial = {a: 1, b: 2, c: {c1: 3, c2: 4}};
    const change = {a: 5, c: {c1: 6}};

    const result = deepPartialSet(initial, change);

    expect(result).toEqual({a: 5, b: 2, c: {c1: 6, c2: 4}});
  });

  it('Should return a new object when any changes apply', () => {
    const initial = {value: 1};

    const result = deepPartialSet(initial, {value: 2});

    expect(result).not.toEqual(initial);
  });

  it('Should return initial object when there are no changes', () => {
    const initial = {};

    const result = deepPartialSet(initial, {});

    expect(result).toEqual(initial);
  });

  it('Should return same inner object when that object has no changes', () => {
    const inner = {};
    const initial = {inner, other: {value: 1}};

    const {inner: innerResult} = deepPartialSet(initial, {other: {value: 2}});

    expect(innerResult).toEqual(inner);
  });

  it('should return same inner object when empty', () => {
    const inner = {};
    const initial = {inner, other: {value: 1}};

    const result = deepPartialSet(initial, {other: {}});

    expect(initial).toEqual(result);
  });

  it('should add 10 gold, 10 silver and 10 copper to persons pouch', () => {
    const person = {
      personal: {
        firstName: 'Test',
        lastName: 'Testsson',
      },
      items: {
        pouch: {color: 'blue', contents: {gold: 10, silver: 20, copper: 30}},
      },
    };

    const result = deepPartialSet(person, {
      items: {
        pouch: {
          contents: {
            gold: i => i + 10,
            silver: i => i + 10,
            copper: i => i + 10,
          },
        },
      },
    });

    expect(result.items.pouch.contents).toEqual({
      gold: 20,
      silver: 30,
      copper: 40,
    });
    // Keep unchanged objects
    expect(result.personal).toBe(person.personal);
    // New objects for the complete tree where a child has a change
    expect(result).not.toBe(person);
    expect(result.items).not.toBe(person.items);
    expect(result.items.pouch).not.toBe(person.items.pouch);
    expect(result.items.pouch.contents).not.toBe(person.items.pouch.contents);
  });
});
