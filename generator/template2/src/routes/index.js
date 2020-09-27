import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage/HomePage'
Vue.use(Router)
const deployName = process.env.VUE_APP_DEPLOY_ROUTER_PATH
export default new Router({
  mode: 'history',
  base: deployName,
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
