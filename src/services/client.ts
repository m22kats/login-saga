import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { StoreStateType } from '../redux/store.type';
import { store } from '../redux/store';

type RequestFunc = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

export const createAuthInterceptor = (): RequestFunc => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer <YOUR_ACCESS_TOKEN>',
  } as AxiosRequestHeaders;

  const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return { ...config, headers };
  };

  return (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.request(onRequest(config)).catch((error: AxiosError) => {
      // Handle error
      return Promise.reject(error);
    });
  };
};

const client = axios.create({
  baseURL: 'http://localhost:54322/users',
  timeout: 5 * 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config?.headers) {
    const state = store.getState() as StoreStateType;
    const token = state.login?.user?.token;
    config.headers['Authorization'] = `Bearer ${token}` || '';
  }
  return config;
});

export { client };
