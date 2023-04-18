import {List} from '../../interfaces/list';
import {filter} from './filter';

describe('list', () => {
  describe('filter', () => {
    const items: List<{id: number; text: string}> = {
      first: {id: 1, text: 'first'},
      second: {id: 2, text: 'second'},
      third: {id: 3, text: 'third'},
    };

    it('should return a new list with only filtered items', () => {
      const result = filter(items, item =>
        ['first', 'third'].includes(item.text)
      );

      expect(Object.keys(result)).toEqual(['first', 'third']);
    });
  });
});
