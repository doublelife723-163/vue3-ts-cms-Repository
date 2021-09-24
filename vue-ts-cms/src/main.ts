import { createApp, App } from 'vue'
import { registerApp } from './global'

import './service/axios_demo'

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
