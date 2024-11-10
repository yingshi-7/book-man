import request from '@/utils/request'

//用户注册接口
export const userRegisterService = (registerData) => {
  //借助于UrlSearchParams对象，将对象转换为请求参数
  const params = new URLSearchParams()
  for (let key in registerData) {
    params.append(key, registerData[key])
  }
  return request.post('/user/register', params)
}

//用户登录接口
export const userLoginService = (loginData) => {
  const params = new URLSearchParams()
  for (let key in loginData) {
    params.append(key, loginData[key])
  }
  return request.post('/user/login', params)
}

// 根据用户id获取用户信息
export const getUserItemService = (userId) => {
  return request.get('/user/userItem?id=' + userId)
}

// 获取当前用户信息
export const getUserInfoService = () => {
  return request.get('/user/userInfo')
}

// 更新用户信息
export const updateUserInfoService = (userInfo) => {
  return request.put('/user/update', userInfo)
}

//修改用户头像
export const updateUserAvatarService = (avatarUrl) => {
  let params = new URLSearchParams()
  params.append('avatarUrl', avatarUrl)
  return request.patch('/user/updateAvatar', params)
}

//修改密码
export const updateUserPasswordService = (updatePwdData) => {
  //application/json参数格式
  return request.patch('/user/updatePwd', updatePwdData)    
}