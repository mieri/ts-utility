import {recursiveSet} from './recursive-set';

describe('Function recursiveSet', function () {
  it('should only change supplied properties', function () {
    const initial = {a: 1, b: 2, c: {c1: 3, c2: 4}};
    const change = {a: 5, c: {c1: 6}};

    const result = recursiveSet(initial, change);

    expect(result).toEqual({a: 5, b: 2, c: {c1: 6, c2: 4}});
  });

  it('Should return a new object when any changes apply', function () {
    const initial = {value: 1};

    const result = recursiveSet(initial, {value: 2});

    expect(result).not.toEqual(initial);
  });

  it('Should return initial object when there are no changes', function () {
    const initial = {};

    const result = recursiveSet(initial, {});

    expect(result).toEqual(initial);
  });

  it('Should return same inner object when that object has no changes', function () {
    const inner = {};
    const initial = {inner, other: {value: 1}};

    const {inner: innerResult} = recursiveSet(initial, {other: {value: 2}});

    expect(innerResult).toEqual(inner);
  });

  it('should return same object when supplied changes are undefined', function () {
    const inner = {};
    const initial = {inner, other: {value: 1}};

    const result = recursiveSet(initial, undefined);

    expect(initial).toEqual(result);
  });

  it('should return same inner object when empty', function () {
    const inner = {};
    const initial = {inner, other: {value: 1}};

    const result = recursiveSet(initial, {other: {}});

    expect(initial).toEqual(result);
  });
});
