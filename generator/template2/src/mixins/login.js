import { mapMutations } from 'vuex'
export default {
  methods: {
    handlerLogin () {
      if (!this.userToken) {
        if (this.isApp) {
          this.helpLogin()
        } else {
          this.setLoginStatus(true)
        }
        return false
      } else {
        return true
      }
    },
    // 转去登录
    helpLogin () {
      let ctx = this
      window.trigger = function (type, data) {
        console.log('登录回调', data)
        if (type === 'userLogin') {
          ctx.muUserMetaInfo({
            token: data.tokenID || data.token, // 安卓这里是tokenID
            userId: data.userId
          })
        }
      }
      location.href = 'bsd://login'
    },
    ...mapMutations(['setLoginStatus', 'muUserMetaInfo'])
  }
}
