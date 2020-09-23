export default {
  state: {
    userIdentity: {
      // 用户信息
      token: null,
      userId: null
    },
    keepAliveArr: []
  },
  getters: {
    userToken: state => {
      return state.userIdentity.token
    },
    userId: state => {
      return state.userIdentity.userId
    }
  },
  mutations: {
    muUserMetaInfo (state, userInfo) {
      state.userIdentity = { ...state.userIdentity, ...userInfo }
    },
    removeKeepAlive (state, nameArr) {
      nameArr.forEach(item => {
        let index = state.keepAliveArr.indexOf(item)
        if (index > -1) {
          state.keepAliveArr.splice(index, 1)
        }
      })
    },
    addKeepALive (state, name) {
      state.keepAliveArr.push(name)
    }
  },
  actions: {}
}