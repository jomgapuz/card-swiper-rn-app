import * as React from 'react';
import {isEqual} from '../tools/checkers';

// eslint-disable-next-line no-unused-vars
export type SetFunction<T> = (getNewValue: (oldVal: T) => T) => void;

// eslint-disable-next-line no-unused-vars
export type RenderFunction = (getIsRender: () => boolean) => void;

const KEY_ORIGINAL = 1;
const KEY_GETTER = 2;
const KEY_SETTER = 3;
const KEY_RENDERER = 4;

/**
 * A fast ⏩ and render-safe ✅ `React.useState()` alternative. 😉
 *
 * @param initialValue
 */
export default function useState<T>(getInitialValue: () => T) {
  const data = React.useRef({
    [KEY_ORIGINAL]: (0 as unknown) as T,

    [KEY_GETTER]: () => {
      const newValue = getInitialValue();
      data[KEY_ORIGINAL] = newValue;
      data[KEY_GETTER] = () => data[KEY_ORIGINAL];

      return newValue;
    },

    [KEY_SETTER]: (getNewValue) => {
      const oldVal = data[KEY_ORIGINAL];

      const value = getNewValue(oldVal);

      // save 💾
      data[KEY_ORIGINAL] = value;

      // check and render ✅
      data[KEY_RENDERER](() => !isEqual(value, oldVal));
    },

    [KEY_RENDERER]: () => {},
  } as {
    [KEY_ORIGINAL]: T;
    [KEY_GETTER]: () => T;
    [KEY_SETTER]: SetFunction<T>;
    [KEY_RENDERER]: RenderFunction;
  }).current;

  const [, set] = React.useState(() => []);

  React.useEffect(() => {
    // for render-safe ✅ mechanism
    data[KEY_RENDERER] = (getIsRender) => {
      if (getIsRender()) {
        set(() => []);
      }
    };

    return () => {
      data[KEY_RENDERER] = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data[KEY_GETTER](), data[KEY_SETTER]] as [
    state: T,
    setState: SetFunction<T>
  ];
}
