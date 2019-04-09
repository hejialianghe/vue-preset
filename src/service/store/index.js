
import { getQueryString } from 'insfns'
import { forceJump } from '@/module/common'
      
export default {
  state: {
    userIdentity: {
      // 用户信息
      token: '',
      userId: null,
      openId: '',
      SecretUid: ''
    },
    linkMeLoadStatus: false, // 加载深度链接状态
    loginStatus: false, // 登录组件显示状态
    shareConfigData: {
      popdesc: '',
      title: '',
      text: '',
      desc: '',
      imgUrl: '',
      shareLink: '',
      callback: () => {}
    },
    invitaId: '',
    keepAliveArr: []
  },
  getters: {
    userToken: state => {
      return state.userIdentity.token
    },
    userId: state => {
      return state.userIdentity.userId
    },
    openId: state => {
      return state.userIdentity.openId
    },
    SecretUid: state => {
      return state.userIdentity.SecretUid
    }
  },
  mutations: {
    muUserMetaInfo (state, userInfo) {
      state.userIdentity = { ...state.userIdentity, ...userInfo }
    },
    setLoginStatus (state, status) {
      state.loginStatus = status
    },
    setLinkMeLoadStatus (state, status) {
      state.linkMeLoadStatus = status
    },
    setInvitaId (state, invitaId) {
      state.invitaId = invitaId
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
  actions: {
    apiWxBind (context) {
      const token = context.getters.userToken
      const code = getQueryString('code')
      if (token) return false
      if (!code) {
        forceJump()
        return
      }
      global.ajax
        .post(
          'elephant/api/public/auth',
          { code },
          {
            noShowDefaultError: true
          }
        )
        .then(data => {
          if (data.openId) {
            context.commit('muUserMetaInfo', { openId: data.openId })
          }
          if (data.login) {
            // 已绑定用户
            context.commit('muWxBindUser', true)
            context.commit('muUserMetaInfo', {
              token: data.token,
              userId: data.userId
            })
          } else if (data.code === '702') {
            let token = context.state.userIdentity.token
            let userId = context.state.userIdentity.userId
            let openId = context.state.userIdentity.openId
            if (token) {
              context.commit('muUserMetaInfo', {
                token,
                openId,
                userId
              })
            } else {
              forceJump()
            }
          } else {
            context.commit('muUserMetaInfo', {
              openId: data.openId
            })
          }
        })
    }
  }
}

      