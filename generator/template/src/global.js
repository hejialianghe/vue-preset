import Vue from 'vue'
import {
  Toast,
  Loading,
  Tabbar,
  TabbarItem,
  Field,
  Button
} from 'vant'
import base from '@/mixins/default'
import directs from '@/module/directives'
import api from '@/service/config'
import * as filters from '@/module/filters'
import '@/assets/css/iconfont.css'
import 'amfe-flexible/index.js'
import navigationHeader from './components/NavigationHeader/NavigationHeader'
Vue.config.productionTip = false
/** 注册eventBus */
global.vbus = new Vue()
/** 注册组件 */
Vue.use(api)
  .use(Toast)
  .use(Loading)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Field)
  .use(Button)

/** 添加自定义指令 */
for (let direct in directs) {
  Vue.directive(direct, directs[direct])
}
/** 添加全局过滤器 */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
/** 添加全局的mixin函数 */
Vue.mixin(base)
/** 添加全局的公共组件 */
Vue.component('navigation-header', navigationHeader)
