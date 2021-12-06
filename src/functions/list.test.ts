// import {expect} from 'chai';
// import {wrap} from './list';
// import {List} from '..';

// describe('List wrapper', function () {
//   const testList: List<string> = {a: 'a', b: 'b', c: 'c'};
//   it('should map correctly', function () {
//     const wrapped = wrap(testList);

//     const result = wrapped.map(item => item.toUpperCase()).list;

//     expect(result).to.deep.equal({a: 'A', b: 'B', c: 'C'});
//   });

//   it('should filter correctly', function () {
//     const wrapped = wrap(testList);

//     const result = wrapped.filter(([, value]) => value !== 'a').list;

//     expect(result).to.deep.equal({b: 'b', c: 'c'});
//   });
// });
