import wx from 'weixin-js-sdk'
import axios from 'axios'

const env = process.env.VUE_APP_API_ENV
const store = require('../plugins/store.js').default

export function registerWxSdk (jsApiList, cb) {
  let isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let locUrl = isIos ? window.entryUrl : location.href
  // ios只配置第一页
  // 安卓为每个url改变都进行重新配置
  return (
    axios({
      method: 'post',
      url: `https://${env}.xiaoxiangyoupin.com/elephant/api/public/sign`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      data: JSON.stringify({
        url: locUrl
      })
    })
      .then(function (res) {
        let configData = res.data.body
        WxConfig(configData, jsApiList, cb)
      })
      .catch(function (err) {
        console.log(err)
        window.__wxsdk_isRegisterOk = false
        throw err
      })
  )
}

export function WxConfig (configData, jsApiList, cb, debug = false) {
  wx.config({
    debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: configData.appId, // 必填，公众号的唯一标识
    timestamp: configData.timestamp, // 必填，生成签名的时间戳
    nonceStr: configData.nonceStr, // 必填，生成签名的随机串
    signature: configData.signature, // 必填，签名，见附录1
    jsApiList: jsApiList
  })
  wx.ready(function () {
    window.__wxsdk_isRegisterOk = true
    cb()
  })
  wx.error(function (err) {
    console.log('微信分享错误', err)
  })
}

export async function shareMsg () {
  let jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
  let data = await getShareConfigData()
  let setting = {
    link: data.link, // 不能用encodeURIComponent转码，安卓端配置都正常，但自定义信息不会出现
    imgUrl: data.imgUrl,
    title: data.title,
    desc: data.desc,
    success: function (e) {
      data.callback()
    }
  }
  let cb = function () {
    let config = store.state.shareConfigData
    let settingNoEncode = {
      link: config.shareLink, // 不能用encodeURIComponent转码，安卓端配置都正常，但自定义信息不会出现
      imgUrl: data.imgUrl,
      title: data.title,
      desc: data.desc,
      success: function (e) {
        data.callback()
      }
    }
    wx.onMenuShareTimeline(setting) // 朋友圈
    wx.onMenuShareAppMessage(setting) // 好友
    wx.onMenuShareQQ(settingNoEncode) // 分享到qq
    wx.onMenuShareQZone(settingNoEncode) // 分享到qq空间
    wx.onMenuShareWeibo(settingNoEncode)// 分享到qq微博
  }
  registerWxSdk(jsApiList, cb)
}

export async function getShareConfigData () {
  let config = store.state.shareConfigData
  config.link = await ProcessShareLink(config.shareLink)
  return config
}

async function ProcessShareLink (targetUrl) {
  let SecretUid = store.state.userIdentity.SecretUid || ''
  let token = store.state.userIdentity.token
  if (token) {
    if (!SecretUid) {
      SecretUid = await getSecretUid(token)
    }
    targetUrl = `${targetUrl}?invitaId=${SecretUid}`
  }
  let sharePage = `https://api.xiaoxiangyoupin.com/v2/newRedirectForWechat?url=${encodeURIComponent(targetUrl)}`
  return sharePage
}

function getSecretUid (token) {
  return axios.get(`https://${env}.xiaoxiangyoupin.com/v2/user/getXxypSecretUserId.json?token=${token}`)
    .then(res => {
      let result = res.data.body.data || ''
      store.commit('muUserMetaInfo', {
        SecretUid: result
      })
      return result
    })
}
