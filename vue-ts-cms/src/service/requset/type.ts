import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YNRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  reponseInterceptor?: (res: T) => T
  // reponseInterceptor?: (res: AxiosResponse) => AxiosResponse
  reponseInterceptorCatch?: (error: any) => any
}

export interface YNRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YNRequestInterceptors<T>
  showLoading?: boolean
}
