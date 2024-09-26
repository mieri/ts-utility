import {Fn} from '../../types';

export function createElement<
  E extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
>(tagName: E, listOrFn?: Node[] | Fn<[Node], void>, list?: Node[]) {
  const elm = document.createElement(tagName);
  if (listOrFn !== undefined || listOrFn !== null) {
    if (typeof listOrFn === 'function') listOrFn.call(null, elm);
    else elm.append(...(listOrFn ?? []));
  }
  if (list) elm.append(...list);
  return elm;
}
