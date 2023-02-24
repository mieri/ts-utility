export type Fn<Args = any[], ReturnType = any> = (
  ...args: Args extends any[] ? Args : never
) => ReturnType;
