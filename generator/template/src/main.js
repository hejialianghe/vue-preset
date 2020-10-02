import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './global'
<%_ if(options.vuex){ _%>
import store from './store'
<%_ } _%>

<%_ if(options.vuex){ _%>
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
<%_ } else { _%>
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
<%_ } _%>