import request from '../utils/request';

// 借阅图书信息接口
export const borrowBookService = (params) => {
  return request.post('/borrowMan/borrow',{params:params})
}