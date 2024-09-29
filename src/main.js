import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import {createPinia} from 'pinia'
// 导入持久化插件
import { createPersistedState } from 'pinia-persistedstate-plugin'
// 导入中文语言包(分页组件)
import locale from 'element-plus/dist/locale/zh-cn.js'

// 创建一个Vue应用实例，使用App作为根组件
const app = createApp(App)
app.use(router)
const pinia = createPinia()
app.use(pinia)
const persist = createPersistedState()
// pinia使用持久化插件
pinia.use(persist)
// 将Element Plus UI组件库添加到Vue应用中，并设置区域设置
app.use(ElementPlus,{locale})

app.mount('#app')
