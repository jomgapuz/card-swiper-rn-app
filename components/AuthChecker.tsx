import {useAppState} from '@react-native-community/hooks';
import * as React from 'react';
import useAuth from '../src/hooks/swr/auth.swr';

export type AuthCheckerProps = {
  onIsLoggedIn: (
    // eslint-disable-next-line no-unused-vars
    value?: boolean
  ) => void;
};

export default function AuthChecker({onIsLoggedIn}: AuthCheckerProps) {
  const {data, revalidate} = useAuth();

  const appState = useAppState();

  const prevousAppState = React.useRef(appState);

  React.useEffect(() => {
    if (prevousAppState.current !== appState) {
      prevousAppState.current = appState;

      revalidate();
    }
  }, [appState, revalidate]);

  React.useEffect(() => {
    onIsLoggedIn(data === undefined ? data : !!data);
  }, [data, onIsLoggedIn]);

  return <></>;
}
