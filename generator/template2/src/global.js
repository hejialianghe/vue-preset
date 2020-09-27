import Vue from 'vue'
import * as filters from '@/module/filters'
import dyCreateSvg from '@/module/dyCreateSvg'
import { lazyLoadSrcMatch } from '@/module/common'
import base from '@/mixins/default'
import login from '@/mixins/login'
import inject from '@/plugins/inject'
import { Toast, Loading, Lazyload } from 'vant'

// 祖册eventBus
global.vbus = new Vue()
// 注册组件
Vue.use(inject)
  .use(Toast)
  .use(Loading)
  .use(Lazyload, {
    loading: dyCreateSvg(),
    filter: {
      progressive (listener, options) {
        let matchData = lazyLoadSrcMatch(listener.src)
        let width, height
        if (matchData) {
          width = matchData[1]
          height = matchData[2]
          let srcBase64 = dyCreateSvg(width, height)
          listener.loading = srcBase64
          listener.loaded = srcBase64
        }
      }
    },
    adapter: {
      loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
        // console.log('el', el)
        // el.src = dyCreateSvg()
      }
    }
  })
// 处理全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// 添加全局的mixin函数
Vue.mixin(base)
  .mixin(login)