import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/Home'
import affairSelect from '@/views/AffairSelect/AffairSelect'
import UserInfo from '@/views/UserInfo/UserInfo'
import layout from '@/views/LayOut'
const Login = () => import(/* webpackChunkName: "login" */'@/components/Login/Login')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'affairSelect'
      }
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: '/home/affairSelect',
          name: 'affairSelect',
          component: affairSelect,
          meta: {
            title: '事务办理'
          }
        },
        {
          path: '/home/userInfo',
          name: 'userInfo',
          component: UserInfo,
          meta: {
            title: '个人中心'
          }
        }
      ]
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            title: '登录'
          }
        }
      ]
    }
  ]
})
