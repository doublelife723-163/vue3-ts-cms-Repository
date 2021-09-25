// service统一出口
import YNRequest from './requset'
import { BASE_URL, TIME_OUT } from './requset/config'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

const ynRequest = new YNRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: AxiosRequestConfig) => {
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err: any) => {
      console.log('请求失败的拦截')
      return err
    },
    reponseInterceptor: (res: AxiosResponse) => {
      console.log('响应成功的拦截')
      return res
    },
    reponseInterceptorCatch: (err: any) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default ynRequest
