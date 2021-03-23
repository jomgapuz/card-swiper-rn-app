import {AxiosRequestConfig} from 'axios';
import {apiToken} from './async-storage';

export async function withAccessToken(config: AxiosRequestConfig) {
  const token = await apiToken.get();

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        token,
      },
    };
  }

  return config;
}

export default null;
