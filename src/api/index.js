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
  // 通过 gitee 进行登录:
  loginByGitee (params) {
    return request({
      url: '/login/gitee',
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
  // 查询点赞文章的状态：
  supportArticleStatus (params) {
    return request({
      url: `/dqlike/status/${params}`,
      method: 'get'
      // data: params
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
  // 给文章取消点赞：
  cancelSupportArticle (params) {
    return request({
      url: `/dqlike/unlike/${params}`,
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
  },
  // 删除自己的评论：
  deleteSelfComment (commentId) {
    return request({
      url: `/dqcomment/remove/${commentId}`,
      method: 'get'
    })
  },
  // 获取二级评论：
  getFloorComment (params) {
    return request({
      url: `/dqcomment/dqroot/${params}`,
      method: 'get'
    })
  },
  // 获取当前用户个人信息：
  getNowUserInfo () {
    return request({
      url: '/dquser/getnowuser',
      method: 'get'
      // data: params
      // mock: true
    })
  },
  // 更新当前用户的个人信息：
  updateUserInfo (params) {
    return request({
      url: '/dquser/update',
      method: 'post',
      data: params
      // mock: true
    })
  },
  // 通过id获取用户个人信息：
  getUserInfobyId (id) {
    return request({
      url: `/dquser/${id}`,
      method: 'get'
      // data: params
      // mock: true
    })
  },
  // 根据用户id查询出自己的所有文章：
  getArticlesbyId (id) {
    return request({
      url: `/dqarticle/author/${id}`,
      method: 'get'
      // data: params
      // mock: true
    })
  },
  // 删除用户子的某篇文章：
  deleteCurrentArticle (id) {
    return request({
      url: `/dqarticle/delete/${id}`,
      method: 'get'
      // data: params
      // mock: true
    })
  },
  // 获取文章的分类：
  getArticleType () {
    return request({
      url: '/dqtype/list',
      method: 'get'
      // data: params
      // mock: true
    })
  },
  // 对文章进行一级评论：
  addComment (params) {
    return request({
      url: '/dqcomment/add',
      method: 'post',
      data: params
      // mock: true
    })
  },
  // 新建文章接口：
  addArticle (params) {
    return request({
      url: '/dqarticle/add',
      method: 'post',
      data: params
      // mock: true
    })
  },
  // 退出登录:
  logout () {
    return request({
      url: '/dquser/logout',
      method: 'get'
    })
  },
  // 删除用户自己:
  deleteMyself () {
    return request({
      url: '/dquser/delete',
      method: 'get'
    })
  }
}
