// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<PropertyKey, any>;

export type Fn<Args extends unknown[], RetType = unknown> = (
  ...args: Args
) => RetType;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = Fn<any[], any>;

export type DeepPartial<T extends AnyObject> = {
  [P in keyof T]?: T[P] extends AnyObject ? DeepPartial<T[P]> : T[P];
};

export type DeepPartialOrFn<T extends AnyObject> = {
  [P in keyof T]?: T[P] extends AnyObject
    ? T[P] extends unknown[]
      ? Fn<[T[P]], T[P]> | T[P]
      : DeepPartialOrFn<T[P]>
    : Fn<[T[P]], T[P]> | T[P];
};

export type NoExtras<A extends AnyObject, B extends AnyObject> = {
  [K in keyof B]: K extends keyof A ? A[K] : never;
};
