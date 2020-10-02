const state = {
  userIdentity: { // 用户登录凭证
    access_token: '',
    refresh_token: ''
  },
  userInfo: {} // 用户信息
}

const getters = {
  access_token: state => state.userIdentity.access_token,
  refresh_token: state => state.userIdentity.refresh_token
}

const actions = {
  /** 获取用户信息接口 */
  getCurrUserInfo ({ commit }, products) {
    global.ajax.get('/api/user/getUserInfo').then(res => {
      commit('setUserInfo', res.data[0])
    })
  }
}

const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data
  },
  setUserIdentity (state, data) {
    state.userIdentity = { ...state.userIdentity, ...data }
    sessionStorage.setItem('userIdentity', JSON.stringify(state.userIdentity))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
