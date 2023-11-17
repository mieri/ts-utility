import {groupBy} from './group-by';
import persons from '../../../test-data.json';

describe('array', () => {
  describe('group-by', () => {
    const items = [
      {id: 1, group: 'first'},
      {id: 2, group: 'first'},
      {id: 3, group: 'second'},
      {id: 4, group: 'third'},
      {id: 5, group: 'third'},
      {id: 6, group: 'first'},
    ];

    it('should group the items by their group', () => {
      const result = groupBy(items, item => item.group);

      expect(result.first?.length).toEqual(3);
      expect(result.second?.length).toEqual(1);
      expect(result.third?.length).toEqual(2);
    });

    it('should group the items by their group with some help of specified keys', () => {
      type specificGroupNames = 'first' | 'second' | 'third';
      const itemsWithSpecificGroups = items as Array<{
        id: number;
        group: specificGroupNames;
      }>;

      const result = groupBy(itemsWithSpecificGroups, item => item.group);

      expect(result.first?.length).toEqual(3);
      expect(result.second?.length).toEqual(1);
      expect(result.third?.length).toEqual(2);

      // @ts-expect-error will give an error since "fourth" is not a known group name.
      expect(result.fourth?.length).toEqual(undefined);
    });

    it('should group by gender', () => {
      const groupedByGender = groupBy(persons, i => i.gender);

      // @ts-expect-error We know that Male exists
      expect(groupedByGender.Male.length).toEqual(450);
      // @ts-expect-error We know that Female exists
      expect(groupedByGender.Female.length).toEqual(444);
    });
  });
});
