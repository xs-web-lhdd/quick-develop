/**
 * @description axios二次封装
 * @author 凉风有信、
 */
import axios from 'axios'
import config from './../config'
// import { Toast } from 'vant'
import router from './../router'
import storage from './storage'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers
  console.log(headers)
  const { tokenValue = '', tokenName = '' } = storage.getItem('userInfo') || {}
  console.log(tokenName, tokenValue)
  // 携带token！！！还有一点bug
  if (!headers.Authorization) headers.Authorization = `${tokenName}:${tokenValue}`
  if (!headers[tokenName]) headers[tokenName] = tokenValue
  return req
})

// 响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return { code, data, msg }
  } else if (code === 500001) {
    // Toast.error(TOKEN_INVALID)
    alert(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else if (code === 500) {
    // alert('用户名或密码错误！')
    return { code, data, msg }
  } else {
    // Toast.error(msg || NETWORK_ERROR)
    alert(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})
/**
  * 请求核心函数
  * @param {*} options 请求配置
  */
function request (options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockAPi : config.baseApi
  }

  return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})

export default request
