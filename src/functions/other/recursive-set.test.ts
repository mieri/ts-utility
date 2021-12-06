import {expect} from 'chai';
import {recursiveSet} from '../..';

describe('Function recursiveSet', function () {
  it('should only change supplied properties', function () {
    const initial = {a: 1, b: 2, c: {c1: 3, c2: 4}};
    const change = {a: 5, c: {c1: 6}};

    const result = recursiveSet(initial, change);

    expect(result).to.deep.equal({a: 5, b: 2, c: {c1: 6, c2: 4}});
  });

  it('Should return a new object when any changes apply', function () {
    const initial = {value: 1};

    const result = recursiveSet(initial, {value: 2});

    expect(result).to.not.equal(initial);
  });

  it('Should return initial object when there are no changes', function () {
    const initial = {};

    const result = recursiveSet(initial, {});

    expect(result).to.equal(initial);
  });

  it('Should return same inner object when that object has no changes', function () {
    const inner = {};
    const initial = {inner, other: {value: 1}};

    const {inner: innerResult} = recursiveSet(initial, {other: {value: 2}});

    expect(innerResult).to.equal(inner);
  });
});
