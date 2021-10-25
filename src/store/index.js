import { createStore } from 'vuex'

import storage from '../utils/storage'
export default createStore({
  state: {
    userInfo: '',
    loading: false
  },
  mutations: {
    // 将登录用户信息进行缓存：
    saveUserInfo (state, userInfo) {
      state.userInfo = userInfo
      storage.setItem('userInfo', userInfo)
    },
    // 对是否进行加载管理：
    changeLoading (state, value) {
      state.loading = value
    }
  },
  actions: {
  },
  modules: {
  }
})
