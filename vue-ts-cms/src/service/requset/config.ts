//1.方式一：手动的切换不同的环境(不推荐)
// 开发环境
// const BASE_URL = 'http://charles.org/dev'
// const BASE_NAME = 'charles'

// 生产环境
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// 测试环境
// const BASE_URL = 'http://markerel.org/dev'
// const BASE_NAME = 'markerel'

// 2.根据process.env.NODE_ENV的值(推荐)
// DefinePlugin这个插件会根据不同的环境对process.env.NODE_ENV注入不同的值
// console.log(process.env.NODE_ENV)
// 开发环境：development
// 生产环境：production
// 测试环境：test
let BASE_URL = ''
let BASE_NAME = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://charles.org/dev'
  BASE_NAME = 'charles'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/dev'
  BASE_NAME = 'coderwhy'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://markerel.org/dev'
  BASE_NAME = 'markerel'
}

// es6：如果先定义，再赋值，最后导出的时候需要用{}包装一下
export { BASE_URL, BASE_NAME }

// 3.通过.env.development, .env.production, .env.test三个单独的配置文件进行配置
