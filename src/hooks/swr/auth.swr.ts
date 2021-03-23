import {Toast} from 'native-base';
import * as React from 'react';
import useSWR from 'swr';
import {getUserDetails, postLogin} from '../../services/authService';

import {LoginRequestData} from '../../services/authService.types';
import {apiToken} from '../../tools/async-storage';

/**
 * If `data` is:
 *
 *  - `null`, no token
 *  - `undefined`, swr not yet loaded
 *
 */
export default function useAuth() {
  const isLoading = React.useRef(false);

  const result = useSWR('@current-user', async () => getUserDetails(), {
    dedupingInterval: 7500,
  });

  return {
    ...result,
    isLoggedIn: !!result.data,

    async login(data: LoginRequestData) {
      if (isLoading.current) {
        return null;
      }

      isLoading.current = true;

      await result.mutate(undefined, false);

      const res = await postLogin(data);

      isLoading.current = false;

      await result.revalidate();

      return res;
    },

    async logout() {
      await apiToken.remove();
      await result.mutate(null, false);
    },

    showLoginErrorToast() {
      Toast.show({
        text: 'You have entered invalid email/username or password.',
        type: 'danger',
        position: 'top',
      });
    },
  };
}
