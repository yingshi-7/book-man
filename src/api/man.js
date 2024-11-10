import request from '@/utils/request'

// 获取图书列表
export const getBookListService = () => {
  return request.get('/library')
}

// 新增图书信息
export const addBookService = (bookData) => {
  return request.post('/library', bookData)
}

// 修改图书信息
export const updateBookService = (bookData) => {
  return request.put('/library', bookData)
}

// 删除图书信息
export const deleteBookService = (id) => {
  return request.delete('/library?id=' + id)
}

// 搜索图书信息
export const getSearchBookService = (params) => {
  return request.get('/library/query', {params: params})
}

//根据图书id获取图书详细信息
export const getBookDetailService = (id) => {
  return request.get('/library/detail?id=' + id)
}