import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入配置
import request from './utils/request'
import storage from './utils/storage'
import api from './api'

// 导入 Vant
import { Lazyload, Form, Field, CellGroup, Button, Loading, DropdownMenu, DropdownItem, Toast } from 'vant'
import 'vant/lib/index.css'

// 导入 Element
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

// 导入全局基本配置：
import './assets/base.scss'
import './assets/iconfont.css'

const app = createApp(App)

// 全局挂载
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api

app
  .use(store)
  .use(router)
  .use(Lazyload, {
    lazyComponent: true
  }) // 执行图片的懒加载
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Loading)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Toast)
  .mount('#app')
