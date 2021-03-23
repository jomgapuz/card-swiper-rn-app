import Axios, {AxiosRequestConfig} from 'axios';

import {
  APIResponseData,
  APIUpdateRequestData,
  RequestJSON,
} from './apiService.types';
import {Undefinable} from '../tools/checkers';
import {ApiBaseUrl} from '../../environment';
import {withAccessToken} from '../tools/axios';

const apiService = Axios.create({
  baseURL: `${ApiBaseUrl}/api`,
});

export default apiService;

apiService.interceptors.request.use(withAccessToken);

export async function apiGet<Data = any, ResponseData = APIResponseData<Data>>(
  requestjson: RequestJSON,
  config?: AxiosRequestConfig,
  url = '/single_api'
) {
  return apiService
    .get<Undefinable<ResponseData>>(url, {
      ...config,
      params: {
        ...config?.params,
        requestjson,
      },
    })
    .then((res) => res.data);
}

export async function apiUpdate<ResponseData = any>(
  {RID, AttributeName, oldValue, newValue}: APIUpdateRequestData,
  config?: AxiosRequestConfig,
  url = '/update_by_rid'
) {
  const formData = new FormData();

  formData.append('RID', `${RID}.${AttributeName}`);
  formData.append('OldValue', oldValue);
  formData.append('Value', newValue);

  return apiService.post<ResponseData>(url, formData, config);
}

export async function apiPost<ResponseData = any>(
  data?: RequestJSON | FormData,
  config?: AxiosRequestConfig,
  url = '/single_api'
) {
  return apiService.post<ResponseData>(url, data, config);
}

export async function apiDeleteByRID<ResponseData = any>(
  referenceId: number,
  config?: Omit<AxiosRequestConfig, 'data'>
) {
  const formData = new FormData();

  formData.append('RID', JSON.stringify(referenceId));

  return apiService.delete<ResponseData>('/delete_by_rid', {
    ...config,
    data: formData,
  });
}
