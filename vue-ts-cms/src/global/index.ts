import { App } from 'vue-demi'
import registerElement from './register-element'

export function registerApp(app: App): void {
  registerElement(app)
}
