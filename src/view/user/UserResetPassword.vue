<template>
  <el-card class="page-container">
      <template #header>
          <div class="header">
              <span>重置密码</span>
          </div>
      </template>
      <el-row>
          <el-col :span="12">
              <el-form :model="ruleForm" status-icon :rules="rules" label-width="100px" size="large">
                  <el-form-item label="原密码" prop="old_pwd">
                      <el-input v-model="ruleForm.old_pwd" type="password" />
                  </el-form-item>
                  <el-form-item label="新密码" prop="new_pwd">
                      <el-input v-model="ruleForm.new_pwd" type="password" />
                  </el-form-item>
                  <el-form-item label="确认密码" prop="re_pwd">
                      <el-input v-model="ruleForm.re_pwd" type="password" />
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="submitForm">
                          重置密码
                      </el-button>
                      <el-button @click="resetForm">清空密码</el-button>
                  </el-form-item>
              </el-form>
          </el-col>
      </el-row>
  </el-card>
</template>

<script setup>
import { updateUserPasswordService } from '@/api/user';
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

//校验密码的函数
const validatePass = (rule, value, callback) => {
  if (value === '') {
      callback(new Error('请再次确认密码'))
  }
  else if (value !== ruleForm.value.new_pwd) {
      callback(new Error('请确保两次输入的密码一致'))
  }
  else {
      callback()
  }
}

//定义表单数据
const ruleForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

//定义表单校验规则
const rules = ref({
  old_pwd: [
      { required: true, message: '请输入原密码', trigger: 'blur' },
      { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  new_pwd: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
      { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  re_pwd: [
      { validator: validatePass, trigger: 'blur' }
  ],
})

//提交表单数据，更新密码，退出登录
import { useTokenStore } from '@/stores/token';
import useUserInfoStore from '@/stores/userInfo';
import { useRouter } from 'vue-router';

const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()
const router = useRouter()

const submitForm = async () => {
  //调用接口完成更新密码
  let res = await updateUserPasswordService(ruleForm.value)
  ElMessage.success(res.msg ? res.msg : '更新成功')

  //退出登录
  //1.清除pinia中存储的token和个人信息
  tokenStore.removeToken()
  userInfoStore.removeInfo()
  //2.跳转到登陆页面
  router.push('/login')
  ElMessage.success('请重新登录')
}

//清空表单中的数据
const resetForm = () => {
  ruleForm.value = {
      old_pwd: '',
      new_pwd: '',
      re_pwd: '',
  }
}
</script>

<style></style>