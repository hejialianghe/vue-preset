
import Vue from 'vue'
import App from './App'
import router from './routes'
import './global'
import store from '@/plugins/store'
import { apSetTitle } from '@/module/appbridge'
import { shareMsg } from '@/module/registersdk'
import { wxAgentBol } from 'insfns'
import { isIos } from '@/module/common'
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    apSetTitle(to.meta.title)
  }
  next()
})
router.afterEach((to, from) => {
  // 针对ios及安卓在微信history模式下分享的问题进行改动
  if (wxAgentBol()) {
    let JudgeisIos = isIos()
    if (JudgeisIos) { // IOS
      if (window.entryUrl === '' || window.entryUrl === undefined) {
        let env = process.env.VUE_APP_API_ENV
        let prefix = ''
        if (env === 'prod') {
          prefix = 'h5'
        } else {
          prefix = 'h5-dev'
        }
        let url = 'https://' + prefix + '.xiaoxiangyoupin.com' + process.env.VUE_APP_DEPLOY_ROUTER_PATH + to.fullPath
        window.entryUrl = url // 将后面的参数去除
      }
      shareMsg()
    } else { // 安卓
      setTimeout(function () {
        shareMsg()
      }, 400)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})     

