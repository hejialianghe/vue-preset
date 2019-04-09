import { apSetRightTitle } from '@/module/appbridge'
let env = process.env.NODE_ENV === 'development' ? 'dev' : 'api'

export default {
  methods: {
    // app,wx分享
    handlerShare () {
      if (this.isApp) {
        window.trigger = (type) => {
          try {
            if (type === 'wxshareCb') {
              this.shareConfigData.callback()
            }
          } catch (err) {
            console.log('t', err)
          }
        }
        this.handlerOpenAppShareModel()
      } else if (this.isWx) {
        global.vbus.$emit('wxGuideModel_show', true)
      }
    },
    handlerOpenAppShareModel () {
      let sharePage = this.handlerProcessShareLink()
      let clientUrl = `bsd://share?popdesc=${this.shareConfigData.popdesc}&title=${
        this.shareConfigData.title
      }&text=${this.shareConfigData.text}&url=${sharePage}&imgurl=${
        this.shareConfigData.imgUrl
      }&cb=wxshareCb`
      location.href = clientUrl
    },
    // 设置右上角分享
    handlerSetRightIcon () {
      let sharePage = this.handlerProcessShareLink()
      let apwb = {}
      apwb.imgU = this.iconurl
      apwb.title = '分享'
      apwb.textCol = '#333333'
      apwb.cmd = 'bsd://share?popdesc=' + encodeURIComponent(this.shareConfigData.popdesc) + '&title=' + encodeURIComponent(this.shareConfigData.title) + '&text=' + encodeURIComponent(this.shareConfigData.text) + '&url=' + sharePage + '&imgurl=' + encodeURIComponent(this.shareConfigData.imgUrl) + '&cb=wxshareCbRightIcon'
      let pars = { 'imgurl': apwb.imgU, 'title': null, 'textColor': apwb.textCol, 'cmd': apwb.cmd + '', 'xxyp': '', 'jsMethod': '' }
      window.trigger = (type, data) => {
        console.log('分享回调', data)
        if (type === 'wxshareCbRightIcon') {
          this.$tj('appshare')
        }
      }
      apSetRightTitle(pars)
    },
    async handlerProcessShareLink () {
      let targetUrl = this.shareConfigData.shareLink
      if (!this.SecretUid && this.userToken) {
        let SecretUid = await this.getSecretUid()
        targetUrl = `${targetUrl}?invitaId=${SecretUid}`
      } else if (this.SecretUid) {
        targetUrl = `${targetUrl}?invitaId=${this.SecretUid}`
      }
      let sharePage = `https://${env}.xiaoxiangyoupin.com/v2/newRedirectForWechat?url=${encodeURIComponent(targetUrl)}`
      return sharePage
    },
    // 获取加密uid
    handlerGetSecretUid () {
      return this.$api['user/getXxypSecretUserId'](
        {
          token: this.userToken
        },
        {
          noShowDefaultError: true,
          noShowLoading: true
        }
      ).then(res => {
        let result = res.data
        console.log('getSecretUid', result)
        this.muUserMetaInfo({
          SecretUid: result
        })
        return result
      })
    }
  }
}
