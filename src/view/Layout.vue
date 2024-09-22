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
} from '@element-plus/icons-vue'
import avatar from '../assets/default.png'

</script>

<template>
  <div>
    <el-container class="layout-container">
      <!-- 左侧菜单栏 -->
      <el-aside width="200px">
        <div class="el-aside_logo"></div>
        <el-menu default-active="/man/books" class="el-menu-vertical-demo" active-text-color="#ffd04b" background-color="#8b8b8b"
          text-color="#fff" router>
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
            <el-menu-item index="/report/books">图书统计</el-menu-item>
            <el-menu-item index="/report/borrows">借阅统计</el-menu-item>
            <el-menu-item index="/report/users">用户统计</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/user">
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/info">基本资料</el-menu-item>
            <el-menu-item index="/user/avatar">更换头像</el-menu-item>
            <el-menu-item index="/user/password">重置密码</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 右侧主区域 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <div>当前用户: <strong>图书管理系统</strong></div>
          <el-dropdown placement="bottom-end" >
            <span class="el-dropdown_box">
              <el-avatar :src="avatar" />
              <el-icon>
                <CaretBottom />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="User">基本资料</el-dropdown-item>
                <el-dropdown-item :icon="Crop">更换头像</el-dropdown-item>
                <el-dropdown-item :icon="EditPen">重置密码</el-dropdown-item>
                <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
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