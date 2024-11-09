<!-- 页面布局 -->
<script setup>
import {
  Document,
  Menu as IconMenu,
  DataLine,
  Setting,
  CaretBottom,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  Reading
} from '@element-plus/icons-vue'
import avatar from '../assets/default.png'
// 引入pinia状态管理库
import useUserInfoStore from '@/stores/userInfo';
import { getUserInfoService } from '@/api/user';
import { ElMessage,ElMessageBox } from 'element-plus';
import { useTokenStore } from '@/stores/token';

// 获取token信息
const tokenStore = useTokenStore()

const userInfoStore = useUserInfoStore()
// 获取当前用户个人信息
const getUserInfo = async () => {
  let res = await getUserInfoService()
  userInfoStore.setInfo(res.data)
}

getUserInfo()

//dropDown条目被点击后的回调函数
import { useRouter } from 'vue-router';
const router = useRouter()
const handleCommand = (command) => {
  if (command === 'logout') {
    // 退出登录
    ElMessageBox.confirm(
      '确认退出登录吗？',
      '温馨提示',
    ).then(async () => {
      // 退出登录
      //1. 清除pinia中存储的token和个人信息
      tokenStore.removeToken()
      userInfoStore.removeInfo()
      //2. 跳转登录页面
      router.push('/login')
      ElMessage({
        type: 'success',
        message: '退出登录成功'
      })
    }).catch(() => {
      // 取消操作
      ElMessage({
        type: 'info',
        message: '用户取消了退出登录'
      })
    })
  } else {
    // 其他条目
    router.push('/user/' + command)
  }
}

</script>

<template>
  <div>
    <el-container class="layout-container">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px">
        <div class="el-aside_logo"></div>
        <el-menu default-active="/man/books" active-text-color="#ffd04b" background-color="#8b8b8b" text-color="#fff"
          router>
          <el-menu-item index="/man/books">
            <el-icon>
              <icon-menu />
            </el-icon>
            <template #title>图书管理</template>
          </el-menu-item>
          <el-menu-item index="/man/borrows">
            <el-icon>
              <document />
            </el-icon>
            <template #title>借阅管理</template>
          </el-menu-item>
          <el-menu-item index="/man/users">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>用户管理</template>
          </el-menu-item>
          <el-sub-menu index="/report">
            <template #title>
              <el-icon>
                <DataLine />
              </el-icon>
              <span>报表统计</span>
            </template>
            <el-menu-item index="/report/books">
              <el-icon>
                <Reading />
              </el-icon>
              <span>图书统计</span>
            </el-menu-item>
            <el-menu-item index="/report/borrows">
              <el-icon>
                <Reading />
              </el-icon>
              <span>借阅统计</span>
            </el-menu-item>
            <el-menu-item index="/report/users">
              <el-icon>
                <Reading />
              </el-icon>
              <span>用户统计</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/user">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/info">
              <el-icon>
                <User />
              </el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon>
                <Crop />
              </el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon>
                <EditPen />
              </el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 右侧主区域 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <div>当前用户: <strong>{{ userInfoStore.info.username }}</strong></div>
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <span class="el-dropdown_box">
              <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar" />
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <!-- 中间区域 -->
        <el-main>
          <div style="width: 1230px; height: 570px; border: 1px solid red;">
            <router-view></router-view>
          </div>
        </el-main>
        <!-- 底部区域 -->
        <el-footer>图书馆管理系统 ©2024 Created by 媵式</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #8b8b8b;

    &_logo {
      height: 120px;
      background: url('@/assets/logo3.png') no-repeat center / 150px auto;
    }

    .el-menu {
      border-radius: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown_box {
      display: flex;
      align-items: center;
    }

    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666
  }
}
</style>