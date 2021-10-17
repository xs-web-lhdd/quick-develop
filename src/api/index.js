/**
 * @author 凉风有信、
 * @description API的统一管理
 */

import request from '../utils/request'

export default {
  login (params) {
    return request({
      url: '/login',
      method: 'post',
      data: params
      // mock: true
    })
  }
}
