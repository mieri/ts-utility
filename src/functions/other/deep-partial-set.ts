import {AnyObject, DeepPartialOrFn, NoExtras} from '../../types';

export function deepPartialSet<
  A extends AnyObject,
  B extends AnyObject & DeepPartialOrFn<A> & NoExtras<DeepPartialOrFn<A>, B>
>(a: A, b: B): A {
  const aKeys: (keyof A)[] = Object.keys(a);
  const bKeys: (keyof B)[] = Object.keys(b);
  const result: A = {...a};
  let changed = false;

  aKeys.forEach(key => {
    if (!bKeys.includes(key)) return;
    let incoming: A[typeof key];

    switch (typeof b[key]) {
      case 'function':
        incoming = b[key](a[key]);
        break;
      case 'object':
        incoming = deepPartialSet(a[key], b[key]);
        break;
      default:
        incoming = b[key];
        break;
    }

    if (incoming === result[key]) return;

    result[key] = incoming;
    changed = true;
  });

  return changed ? result : a;
}
