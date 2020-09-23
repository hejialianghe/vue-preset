import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './global'
import store from './store/index'
import { OLD_REQUEST } from './module/config'
router.beforeEach((to, from, next) => {
  OLD_REQUEST.length = 0
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
