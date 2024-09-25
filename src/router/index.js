// 导入vue-router组件
import { createRouter, createWebHistory } from 'vue-router';
// 导入组件
import LoginVue from '@/view/Login.vue'
import LayoutVue from '@/view/Layout.vue'
import BookManVue from '@/view/man/BookMan.vue'
import BorrowManVue from '@/view/man/BorrowMan.vue'
import UserManVue from '@/view/man/UserMan.vue'
import UserAvatarVue from '@/view/user/UserAvatar.vue'
import UserInfoVue from '@/view/user/UserInfo.vue'
import UserResetPasswordVue from '@/view/user/UserResetPassword.vue'
import ReportBookVue from '@/view/report/ReportBook.vue'
import ReportBorrowVue from '@/view/report/ReportBorrow.vue'
import ReportUserVue from '@/view/report/ReportUser.vue'

// 定义路由关系
const routes = [
  { path: '/login', component: LoginVue },
  {
    path: '/',
    component: LayoutVue,
    // 重定向到登录页面
    redirect: '/login',
    // 子路由
    children: [
      { path: '/man/books', component: BookManVue },
      { path: '/man/borrows', component: BorrowManVue },
      { path: '/man/users', component: UserManVue },
      { path: '/user/avatar', component: UserAvatarVue },
      { path: '/user/info', component: UserInfoVue },
      { path: '/user/password', component: UserResetPasswordVue },
      { path: '/report/books', component: ReportBookVue },
      { path: '/report/borrows', component: ReportBorrowVue },
      { path: '/report/users', component: ReportUserVue },
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router