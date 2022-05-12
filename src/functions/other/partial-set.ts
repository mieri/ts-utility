import {Fn} from '../../types/any-fn';
import {
  RecursivePartial,
  RecursivePartialOrFn,
} from '../../types/recursive-partial';

export function partialSet<T extends {}>(
  old: T,
  incoming?: RecursivePartial<T>
): T {
  const result = {...old};

  if (!incoming) return result;

  for (const key in old) {
    const current = old[key];
    const replacement = incoming?.[key] as
      | T[Extract<keyof T, string>]
      | undefined;

    switch (typeof current) {
      case 'object':
        result[key] = Array.isArray(current)
          ? replacement ?? current
          : partialSet(current, replacement);
        break;
      default:
        result[key] = replacement ?? current;
        break;
    }
  }
  return result;
}

export function partialSetFn<T extends {}>(
  previous: T,
  next?: RecursivePartialOrFn<T>
): T {
  const result = {...previous};

  if (!next) return result;

  for (const key in previous) {
    const current = previous[key];
    let replacement = next?.[key];

    if (typeof replacement === 'function') {
      replacement = replacement(current);
    }

    const temp = replacement as T[Extract<keyof T, string>] | undefined;

    switch (typeof current) {
      case 'object':
        result[key] = Array.isArray(current)
          ? temp ?? current
          : partialSetFn(current, temp);
        break;
      default:
        result[key] = temp ?? current;
        break;
    }
  }
  return result;
}
