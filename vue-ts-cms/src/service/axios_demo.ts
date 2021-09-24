//axios的实例对象
import axios from 'axios'

// 1.get请求，并且传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'charles',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 2.post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'coderwhy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 3.Promise本身是可以有类型的
// new Promise<string>((resolve) => {
//   resolve('abc')
// }).then((res) => {
//   console.log(res.length)
// })

// 4.axios的配置选项
// 全局的配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// 每一个请求单独的配置
axios
  .get('/get', {
    params: {
      name: 'charles',
      age: 18
    },
    headers: {},
    timeout: 5000
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('/post', {
    data: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// 5.axios.all -> 多个请求，一起返回 要求传入一个数组[]
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'Kevin',
        age: 18
      }
    }),
    axios.post('post', {
      data: {
        name: 'Mackerel',
        age: 18
      }
    })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// 6.axios的拦截器
// 拦截请求
// fn1：请求发送成功会执行的函数
// fn2：请求发送失败会执行的函数 一般都不会使用到
// config：配置信息 fn1会将config传入 并返回一个config
axios.interceptors.request.use(
  (config) => {
    // 可以做一些操作
    // 1.给请求添加token
    // 2.isLoading动画
    console.log('请求拦截成功')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
//拦截响应
// fn1：数据响应成功(服务器正常的返回了数据 20x)
// fn2：服务器响应失败 40x
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
