import { createStore } from 'vuex'

import storage from '../utils/storage'
export default createStore({
  state: {
  },
  mutations: {
    saveUserInfo (state, userInfo) {
      state.userInfo = userInfo
      storage.setItem('userInfo', userInfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
