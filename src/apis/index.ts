import { message } from 'antd';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HTTP_STATUS, HTTP_STATUS_MAP } from '@/constants/http';
import useAuthStore from '@/store/auth';

const TIMEOUT = 30000;
const BASE_URL = 'http://0.0.0.0:3001/api';

class Http {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
    });

    this.http.interceptors.request.use((config) => {
      if (config.url !== '/user/login') {
        const { token } = useAuthStore.getState();
        config.headers['authorization'] = token;
      }
      return config;
    });

    this.http.interceptors.response.use(
      ({ data }: AxiosResponse) => {
        return data.data;
      },
      (error: AxiosError<{ code: string }>) => {
        if (error.message === 'Network Error') {
          // TODO: cancel
        }
        const { data, status } = error.response || { status: 500 };
        if (status === HTTP_STATUS.UNAUTHORIZED) {
          const { logout } = useAuthStore.getState();
          logout();
        }
        const { code } = data || ({} as { code: string });
        const errorMsg = HTTP_STATUS_MAP[status as HTTP_STATUS] || '系统错误，请稍后重试';
        const newError = {
          status,
          code,
          message: errorMsg,
        };
        if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
          message.error(errorMsg);
        }
        return Promise.reject(newError);
      },
    );
  }

  public get<T = unknown>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.http.get(url, { params, ...config });
  }

  public post<T = unknown>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.http.post(url, data, config);
  }
}

export default new Http();
