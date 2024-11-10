import request from '../utils/request';

// 借阅图书信息接口
export const borrowBookService = (params) => {
  return request.post('/borrowMan/borrow', { params: params })
}

// 获取所有图书的借阅信息接口 
export const getAllBorrowInfoService = () => {
  return request.get('/borrowMan')
}

// 搜索图书的借阅信息接口 
export const getSearchBorrowInfoService = (params) => {
  return request.get('/borrowMan/list', { params: params })
}

// 修改图书借阅状态接口
export const updateBorrowStatusService = (params) => {
  return request.put('/borrowMan/state', params)
}

// 图书续借接口
export const renewBookService = (params) => {
  return request.put('/borrowMan', params)
}