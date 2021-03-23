import {StatusBar} from 'expo-status-bar';
import {Root} from 'native-base';
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {WithChildren} from '../src/types/types';
import {StoreProvider} from '../store/useStore';

export default function Providers({children}: WithChildren) {
  return (
    <Root>
      <StoreProvider>
        <SafeAreaProvider>
          {children}
          <StatusBar />
        </SafeAreaProvider>
      </StoreProvider>
    </Root>
  );
}
