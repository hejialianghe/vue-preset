import Vue from 'vue'
import Router from 'vue-router'
const home = () => import(/* webpackChunkName: "login" */'@/views/Home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]
})
