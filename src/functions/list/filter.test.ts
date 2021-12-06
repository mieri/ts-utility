import {expect} from 'chai';
import {List} from '../../interfaces/list';
import {filter} from './filter';

describe('list', function () {
  describe('filter', function () {
    const items: List<string> = {
      first: 'first',
      second: 'second',
      third: 'third',
    };

    it('should return a new list with only filtered items', function () {
      const result = filter(items, ([key]) => ['first', 'third'].includes(key));

      expect(result).to.eql({first: 'first', third: 'third'});
    });
  });
});
