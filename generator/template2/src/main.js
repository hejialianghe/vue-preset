import Vue from 'vue'
import App from './App'
import router from './routes'
import './global'
import store from '@/plugins/store'
import { apSetTitle } from '@/module/appbridge'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    apSetTitle(to.meta.title)
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
