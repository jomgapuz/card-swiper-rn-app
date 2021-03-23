import * as yup from 'yup';
import {ObjectShape} from 'yup/lib/object';
import {isRealObject} from './checkers';
import {ensureString, parseNumber} from './parsers';

// PRIMITIVES

export const yupString = yup
  .string()
  .transform(function transformString(value) {
    return ensureString(value);
  })
  .default('');

export const yupNumber = yup
  .number()
  .transform(function transformNumber(value) {
    return parseNumber(value);
  })
  .default(0);

export const yupBoolean = yup.boolean().default(false).transform(Boolean);

export function yupObject<T extends ObjectShape>(spec: T) {
  return yup.object(spec).transform(function transformObject(value) {
    return isRealObject(value) ? value : {};
  });
}

export function yupArray<T extends yup.AnySchema>(spec: T) {
  return yup
    .array(spec)
    .transform(function transformArray(value) {
      return Array.isArray(value) ? value : [];
    })
    .default([]);
}
