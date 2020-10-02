import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keepAliveArr: []
  },
  mutations: {
    addKeepAliveArr (state, data) {
      let value = state.keepAliveArr.find(item => item === data)
      if (!value) state.keepAliveArr.push(data)
    },
    removeKeepAliveArr (state, data) {
      let index = state.keepAliveArr.findIndex(item => item === data)
      if (index > -1)state.keepAliveArr.splice(index, 1)
    }
  },
  actions: {},
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    paths: ['user.userInfo', 'user.info'],
    storage: window.sessionStorage
  })]
})
