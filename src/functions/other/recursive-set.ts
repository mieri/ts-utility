import {RecursivePartial} from '../../types/recursive-partial';

export function recursiveSet<T extends {}>(
  target: T,
  properties?: RecursivePartial<T>
): T {
  let result = target;

  if (!properties) return result;

  for (const key in result) {
    const currentValue = properties[key];

    if (typeof currentValue === 'undefined') continue;

    if (typeof currentValue === 'object' && !Array.isArray(currentValue)) {
      const resultValue = result[key];
      const innerResult = recursiveSet(resultValue, currentValue);
      if (innerResult === resultValue) continue;

      result = {
        ...result,
        [key]: {
          ...resultValue,
          ...innerResult,
        },
      };
    } else {
      result = {
        ...result,
        [key]: currentValue,
      };
    }
  }

  return result;
}
