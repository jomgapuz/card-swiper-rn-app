import * as React from 'react';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './navigation/Navigation';
import Providers from './components/Providers';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Providers>
      <Navigation />
    </Providers>
  );
}
