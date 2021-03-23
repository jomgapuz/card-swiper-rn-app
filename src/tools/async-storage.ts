import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_AS_KEY = 'token';

export const THEME_AS_KEY = 'theme';

export function createSimpleItemManager(key: string) {
  return {
    get: async () => AsyncStorage.getItem(key),
    set: async (value: string) => AsyncStorage.setItem(key, value),
    remove: async () => AsyncStorage.removeItem(key),
  };
}

export function createItemManager<T>(
  key: string,
  parse: (
    // eslint-disable-next-line no-unused-vars
    value: string
  ) => Promise<T>,
  stringify = (value: T) => JSON.stringify(value)
) {
  return {
    get: async () => {
      const item = await AsyncStorage.getItem(key);

      if (item) {
        return parse(item).catch(() => null);
      }

      return null;
    },
    set: async (value: T) => AsyncStorage.setItem(key, stringify(value)),
    remove: async () => AsyncStorage.removeItem(key),
  };
}

export const apiToken = createSimpleItemManager(TOKEN_AS_KEY);

export const userTheme = createItemManager(
  THEME_AS_KEY,
  async (value) => JSON.parse(value) as {}
);
