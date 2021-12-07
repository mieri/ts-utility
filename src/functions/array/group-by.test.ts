import {groupBy} from './group-by';

describe('array', function () {
  describe('group-by', function () {
    const items = [
      {id: 1, group: 'first'},
      {id: 2, group: 'first'},
      {id: 3, group: 'second'},
      {id: 4, group: 'third'},
      {id: 5, group: 'third'},
      {id: 6, group: 'first'},
    ];

    it('should group the items by their group', function () {
      const result = groupBy(items, item => item.group);

      expect(result.first?.length).toEqual(3);
      expect(result.second?.length).toEqual(1);
      expect(result.third?.length).toEqual(2);
    });

    it('should group the items by their group with some help of specified keys', function () {
      type specificGroupNames = 'first' | 'second' | 'third';
      const itemsWithSpecificGroups = items as Array<{
        id: number;
        group: specificGroupNames;
      }>;

      const result = groupBy(itemsWithSpecificGroups, item => item.group);

      expect(result.first?.length).toEqual(3);
      expect(result.second?.length).toEqual(1);
      expect(result.third?.length).toEqual(2);

      // expect(result.fourth?.length).equals(2);
      // will give an error since "fourth" is not a known group name.
    });
  });
});
