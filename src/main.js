import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import {createPinia} from 'pinia'

// 创建一个Vue应用实例，使用App作为根组件
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
