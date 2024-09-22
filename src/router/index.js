// 导入vue-router组件
import { createRouter, createWebHistory } from 'vue-router';
// 导入组件
import LoginVue from '@/view/Login.vue'
import LayoutVue from '@/view/Layout.vue'

// 定义路由关系
const routes = [
  { path: '/login', component: LoginVue },
  { path: '/', component: LayoutVue }
]

// 创建路由实例
const router = createRouter({
  history:createWebHistory(),
  routes:routes
});

export default router