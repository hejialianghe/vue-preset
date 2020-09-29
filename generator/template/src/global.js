import Vue from 'vue'
import api from '@/service/config'
<%_ if(options.application === 'mobile'){ _%>
import {
  Toast,
  Loading
} from 'vant'
import 'amfe-flexible/index.js'
/** 注册组件 */
Vue.use(api)
  .use(Toast)
  .use(Loading)
<%_ } else  {_%>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(api)
    use(ElementUI)
<%_ } _%>
import base from '@/mixins/default'
import directs from '@/module/directives'

import * as filters from '@/module/filters'

Vue.config.productionTip = false
/** 注册eventBus */
global.vbus = new Vue()



/** 添加自定义指令 */
for (let direct in directs) {
  Vue.directive(direct, directs[direct])
}
/** 添加全局过滤器 */
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
/** 添加全局的mixin函数 */
Vue.mixin(base)

