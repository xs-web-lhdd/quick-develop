/**
 * @author 凉风有信、
 * @description API的统一管理
 */

import request from '../utils/request'

export default {
  // 登录：
  login (params) {
    return request({
      url: '/login',
      method: 'post',
      data: params
      // mock: true
    })
  },
  // 注册：
  register (params) {
    return request({
      url: '/register',
      method: 'post',
      data: params
      // mock: true
    })
  },
  // 查询所有文章：
  allArticles (params) {
    return request({
      url: '/dqarticle/superlist',
      method: 'get',
      data: params
      // mock: true
    })
  },
  // 查询每一篇文章的详情介绍：
  articleDetail (params) {
    return request({
      url: '/dqarticle/superlist',
      method: 'get',
      data: params
      // mock: true
    })
  },
  // 给文章点赞：
  supportArticle (params) {
    console.log(params)
    return request({
      url: `/dqlike/like/${params}`,
      method: 'get'
      // data: params
      // mock: true
    })
  }
}
