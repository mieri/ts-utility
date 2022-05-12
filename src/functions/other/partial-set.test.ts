import {partialSet, partialSetFn} from './partial-set';

describe('partialSet', () => {
  const test = {a: {b: 'b', c: 'c'}};
  it('should replace with the supplied objects properties but keep references to unchanged properties', () => {
    const result = partialSet(test, {a: {b: 'nytt'}});

    expect(result).toEqual({a: {b: 'nytt', c: test.a.c}});
    expect(result.a.c).toBe(test.a.c);
  });

  it('should return a new object with the same referenses in all properties', () => {
    const result = partialSet(test);

    expect(result).not.toBe(test);
  });
});

describe('partialSetFn', () => {
  const test = {a: {b: 'b', c: 'c'}};
  it('should replace with the supplied objects properties but keep references to unchanged properties', () => {
    const result = partialSetFn(test, {a: {b: 'nytt'}});

    expect(result).toEqual({a: {b: 'nytt', c: test.a.c}});
    expect(result.a.c).toBe(test.a.c);
  });

  it('should return a new object with the same referenses in all properties', () => {
    const result = partialSetFn(test);

    expect(result).not.toBe(test);
  });

  it('should return run supplied function on given property', () => {
    const result = partialSetFn(test, {a: {c: i => i + 'extra'}});

    expect(result).toEqual({a: {b: test.a.b, c: 'cextra'}});
  });
});
