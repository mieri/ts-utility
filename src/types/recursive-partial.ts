import {Fn} from './any-fn';

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export type RecursivePartialOr<T, TOr> = {
  [P in keyof T]?: T[P] extends object
    ? RecursivePartialOr<T[P], TOr>
    : T[P] | TOr;
};

export type RecursivePartialOrFn<T> = {
  [P in keyof T]?: T[P] extends object
    ? RecursivePartialOrFn<T[P]>
    : T[P] | Fn<[T[P], T[P]]>;
};
