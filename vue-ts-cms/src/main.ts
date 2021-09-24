import { createApp, App } from 'vue'
import { registerApp } from './global'

import rootApp from './App.vue'

import router from './router'
import store from './store'

const app: App = createApp(rootApp)
registerApp(app)

app.use(router)
app.use(store)
app.mount('#app')
