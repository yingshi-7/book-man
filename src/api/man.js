import { useTokenStore } from '@/store/token.js'
import request from '@/utils/request'

// 获取图书列表
export const getBookList = () => {
  const tokenStore = useTokenStore()
  //通过请求头Authorization携带token
  return request.get('/library', {headers:{'Authorization':tokenStore.token}})
}