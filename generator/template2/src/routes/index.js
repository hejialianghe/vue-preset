import Vue from '../../../template1/src/routes/node_modules/vue'
import Router from '../../../template1/src/routes/node_modules/vue-router'
import HomePage from '../../../template1/src/routes/node_modules/@/views/HomePage/HomePage'
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
