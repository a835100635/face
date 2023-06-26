import App from './App'
import { createSSRApp } from 'vue'
import store from './store'
import './assets/style/iconfont/iconfont.css'
import './assets/style/other-iconfont.css'
import './assets//style/init.scss'
import FIcon from '@/components/icon.vue'

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.component('f-icon', FIcon);
  return {
    app
  }
}