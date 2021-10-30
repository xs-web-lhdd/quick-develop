import { createStore } from 'vuex'

import storage from '../utils/storage'
export default createStore({
  state: {
    userInfo: '',
    loading: false,
    userAllInfo: ''
    // reply: ''
  },
  mutations: {
    // 将登录用户信息进行缓存：
    saveUserInfo (state, userInfo) {
      state.userInfo = userInfo
      storage.setItem('userInfo', userInfo)
    },
    // 保存用户的所有信息：
    saveUserAllInfo (state, userAllInfo) {
      state.userAllInfo = userAllInfo
      storage.setItem('userAllInfo', userAllInfo)
    },
    // 对是否进行加载管理：
    changeLoading (state, value) {
      state.loading = value
    }
    //
    // changeReply (state, value) {
    //   state.reply = value
    // }
  },
  actions: {
  },
  modules: {
  }
})
