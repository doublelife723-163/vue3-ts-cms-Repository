import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { compile } from '@vue/compiler-dom'
import type { YNRequestInterceptors, YNRequestConfig } from './type'
import { ElLoading, ILoadingInstance } from 'element-plus'

const DEFAULT_LOADING = true

// 如果在开发中有很多的逻辑需要封装，比较推荐使用类class来封装
// 因为类具有更强的封装性
class YNRequest {
  instance: AxiosInstance
  interceptors?: YNRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: YNRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.reponseInterceptor,
      this.interceptors?.reponseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器：请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器：响应成功拦截')

        // 将Loading移除
        // this.loading?.close()
        setTimeout(() => {
          this.loading?.close()
        }, 1500)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败拦截')
        if (err.response.status === 404) {
          console.log('404 NOT FOUND')
        }
        return err
      }
    )
  }

  request<T>(config: YNRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.reponseInterceptor) {
            res = config.interceptors.reponseInterceptor(res)
          }
          console.log(res)

          this.showLoading = DEFAULT_LOADING

          // 这里的res: AxiosResponse<any>
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING

          reject(err)

          return err
        })
    })
  }

  get<T>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default YNRequest
