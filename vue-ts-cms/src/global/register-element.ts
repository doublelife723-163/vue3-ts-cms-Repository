import { App } from 'vue-demi'

//全局引入 全局引用
import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'

// import 'element-plus/theme-chalk/base.css'
// import { ElButton } from 'element-plus'

export default function (app: App): void {
  app.use(ElementPlus)
  // app.component(ElButton.name, ElButton)
}
