import request from '@/utils/request'

// 获取图书列表
export const getBookListService = () => {
  return request.get('/library')
}

// 新增图书信息
export const addBookService = (bookData) => {
  return request.post('/library',bookData)
}