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
    return request({
      url: `/dqlike/like/${params}`,
      method: 'get'
      // data: params
      // mock: true
    })
  },
  // 获取文章的点赞数量：
  getArticleLike (params) {
    return request({
      url: `/dqlike/getlikes/${params}`,
      method: 'get'
      // data: params
      // mock: true
    })
  },
  // 根据文章ID获取文章的所有评论
  getArticleComments (params) {
    return request({
      url: '/dqcomment/superlist',
      method: 'get',
      data: params
      // mock: true
    })
  }
}
