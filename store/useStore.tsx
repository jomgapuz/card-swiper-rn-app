import * as React from 'react';

import {WithChildren} from '../src/types/types';
import RootStore from './RootStore';

const StoreContext = React.createContext(null as null | RootStore);

export default function useStore() {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error(
      '`useStore()` must be used inside the <StoreProvider> tree.'
    );
  }

  return store;
}

export function StoreProvider({children}: WithChildren) {
  const store = new RootStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
