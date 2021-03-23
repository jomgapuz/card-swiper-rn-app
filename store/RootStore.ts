import {Dimensions} from 'react-native';

import BaseStore from './BaseStore';

export function getDefaultRootStoreData() {
  const window = Dimensions.get('window');

  return {
    appHeight: window.height,
    appWidth: window.width,
    wrapHeight: window.height,
    wrapWidth: window.width,
    wrapInsets: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      isOnEdge: true,
    },
  };
}

export type RootStoreData = ReturnType<typeof getDefaultRootStoreData>;

export default class RootStore extends BaseStore<RootStoreData> {
  constructor(defaultData = getDefaultRootStoreData()) {
    super(defaultData);
  }
}
