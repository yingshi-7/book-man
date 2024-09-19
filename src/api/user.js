import request from '@/utils/request'

//用户注册接口
export const userRegisterService = (registerDta) => {
  //借助于UrlSearchParams对象，将对象转换为请求参数
  const params = new URLSearchParams()
  for (let key in registerDta) {
    params.append(key, registerDta[key])
  }
  return request.post('/user/register', params)
}