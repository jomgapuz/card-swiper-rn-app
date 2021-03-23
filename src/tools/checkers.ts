import * as React from 'react';

export type Undefinable<T> = T | undefined;

export type Maybe<T> = T | undefined | null;

export const isUndefined = (value: any): value is undefined =>
  typeof value === 'undefined';

export const isDefined = <T>(value: Undefinable<T>): value is T =>
  typeof value !== 'undefined';

export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

export const isReactText = (value: any): value is React.ReactText =>
  value && (typeof value === 'string' || typeof value === 'number');

export const isString = (value: any): value is string =>
  value && typeof value === 'string';

export const isBoolean = (value: any): value is boolean =>
  typeof value === 'boolean';

export const areObjectsEqual = <A extends Record<string, any>>(
  a: A,
  b: A,
  objects = [] as any[]
): b is A => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  if (aKeys.some((aKey) => !bKeys.includes(aKey))) {
    return false;
  }

  if (aKeys.some((aKey) => !isEqual(a[aKey], b[aKey], objects))) {
    return false;
  }

  return true;
};

export function areArraysEqual<A>(
  a: Array<A>,
  b: Array<A>,
  objects = [] as any[]
): b is Array<A> {
  if (a.length !== b.length) {
    return false;
  }

  if (a.some((_, i) => !isEqual(a[i], b[i], objects))) {
    return false;
  }

  return true;
}

export function isArray<T = any>(a: any): a is T[] {
  return Array.isArray(a);
}

export const isTypeObject = <T extends object>(value: any): value is T =>
  typeof value === 'object';

export const isObject = <T extends object>(value: any): value is T =>
  value && isTypeObject<T>(value);

export function isRealObject<T extends object>(value: any): value is T {
  return isObject(value) && !isArray(value);
}

/**
 * Check equality with circular reference safety.
 */
export function isEqual<A = any>(a: A, b: A, objects = [] as any[]): b is A {
  if (a === b) {
    return true;
  }

  if (!objects.includes(a)) {
    if (isObject(a)) {
      if (isObject(b)) {
        if (isArray(a)) {
          return isArray(b) && areArraysEqual(a, b, [...objects, a]);
        }

        return !isArray(b) && areObjectsEqual(a, b, [...objects, a]);
      }
    }
  }

  return false;
}

export const isObjectOrNull = <T extends object | null>(
  value: T | null
): value is T | null => typeof value === 'object' && !isArray(value);

export const isObjectNotArray = <T extends object>(value: any): value is T =>
  isObject(value) && !isArray(value);
