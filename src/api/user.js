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
  for (let key in loginData){
    params.append(key,loginData[key])
  }
  return request.post('/user/login',params)
}