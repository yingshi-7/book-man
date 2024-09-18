import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建一个Vue应用实例，使用App作为根组件
const app = createApp(App)
// app.use(router)
app.use(ElementPlus)

app.mount('#app')
