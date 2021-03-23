import {isObject, isString} from './checkers';

/**
 * `defaultValue = 0`
 */
export function parseNumber(value: any, defaultValue = 0) {
  const newValue = Number(value);

  return Number.isFinite(newValue) ? newValue : defaultValue;
}

export function parseObject<T extends object>(value: any) {
  return isObject<T>(value) ? value : ({} as T);
}

export function parseArray(value: any) {
  return Array.isArray(value) ? value : [];
}

export function parseDate(value: any) {
  const date = new Date(value);

  if (date.toString().toLowerCase().includes('invalid')) {
    return new Date(0);
  }

  return date;
}

export function parseJSON<T extends object>(
  value: any,
  defaultValue = {} as T
): T {
  try {
    const parsed = JSON.parse(value);

    if (isObject<T>(parsed)) {
      return parsed;
    }
  } catch (e) {
    // pass
  }

  return defaultValue;
}

/**
 * `value` is returned if it's `string`.
 * Else, return `defaultValue`.
 *
 * `defaultValue` is `''` by default
 */
export function ensureString(value: any, defaultValue = '') {
  if (isString(value)) {
    return value;
  }

  return defaultValue;
}
