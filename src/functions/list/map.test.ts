import {expect} from 'chai';
import {List} from '../../interfaces/list';
import {map} from './map';

describe('list', () => {
  const items: List<{id: number; text: string}> = {
    first: {id: 1, text: 'first'},
    second: {id: 2, text: 'second'},
    third: {id: 3, text: 'third'},
  };

  describe('map', () => {
    it('should return a new object with the same keys mapped', () => {
      const result = map(items, i => i.text.toUpperCase());

      expect(result).to.eql({first: 'FIRST', second: 'SECOND', third: 'THIRD'});
    });
  });
});
