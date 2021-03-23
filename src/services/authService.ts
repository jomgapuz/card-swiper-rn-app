import {AxiosError} from 'axios';

import {apiToken} from '../tools/async-storage';
import '../tools/yup';
import {apiPost} from './apiService';
import {
  GETUserDetailsErrorSchema,
  GETUserDetailsResponseSchema,
  LoginRequestData,
  POSTLoginResponseSchema,
} from './authService.types';

export const postLogin = async ({email, password}: LoginRequestData) => {
  const formData = new FormData();

  formData.append('EmailAddress', email);
  formData.append('Password', password);

  // NOTE obfuscated/added for preview purposes
  await apiToken.set('token');

  return {
    token: 'token',
  };
};

export const getUserDetails = async () => {
  const token = await apiToken.get();

  if (!token) {
    return null;
  }

  // NOTE obfuscated/added for preview purposes
  return true;
};
