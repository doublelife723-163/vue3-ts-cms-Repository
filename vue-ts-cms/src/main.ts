import { createApp, App } from 'vue'
import { registerApp } from './global'

// import './service/axios_demo'
import ynRequest from './service'

import rootApp from './App.vue'

import router from './router'
import store from './store'

const app: App = createApp(rootApp)
registerApp(app)

app.use(router)
app.use(store)
app.mount('#app')

// 以VUE_APP_开头的变量会被webpack.DefinePlugin静态注入
// 可以通过process.env.xxx来访问它们
console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

// ynRequest.request({
//   url: '/users/list',
//   method: 'POST',
//   interceptors: {
//     reponseInterceptor: (res: any) => {
//       console.log('单独响应的response')
//       return res
//     },
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     }
//   }
// })

// ynRequest.request({
//   url: '/',
//   method: 'GET',
//   showLoading: false
// })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

ynRequest
  .get<DataType>({
    url: '/'
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
