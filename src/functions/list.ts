// import {List} from '../interfaces/list';
// import {filter} from './list/filter';
// import {map} from './list/map';
// import {partialSet} from './list/partial-set';

// function createWrapper<T>(...functions: Array<(list: List<T>) => any>) {
//   functions.reduce((acc, fn) => {}, {list});
// }

// export const wrap = <T>(list: List<T>): {list: List<T>} => ({
//   list,
//   filter: (fn: Parameters<typeof filter>[1]) => wrap<T>(filter(list, fn)),
//   map: (fn: Parameters<typeof map>[1]) => wrap<T>(map(list, fn)),
//   partialSet: (input: Parameters<typeof partialSet>[1]) =>
//     wrap(partialSet(list, input)),
// });
