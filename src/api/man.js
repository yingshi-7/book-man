import request from '@/utils/request'

// 获取图书列表
export const getBookList = () => {
  return request.get('/library')
}