<template>
  <div id="app">
      <!-- <keep-alive :include="keepAliveArr">
        <router-view ></router-view>
      </keep-alive> -->
       <router-view ></router-view>
        <!-- 加载弹层 -->
    <Loading v-if="loadingStauts"></Loading>

  </div>
</template>
<script>
import Loading from '@/components/Loading/Loading'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      loadingStauts: false
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(['keepAliveArr'])
  },
  created () {
    this.bindEvent()
    this.setUserInfo()
  },
  mounted () {
  },
  methods: {
    bindEvent () {
      global.vbus.$on('toast_show', (resData) => {
        this.$toast(resData)
      })
      global.vbus.$on('loading_show', (status) => {
        this.loadingStauts = status
      })
    },
    setUserInfo () {
      let userIdentity = sessionStorage.getItem('userIdentity') || null
      userIdentity = JSON.parse(userIdentity)
      let type = Object.prototype.toString.call(userIdentity) === '[object Object]'
      if (type && userIdentity !== null) {
        this.setUserIdentity(userIdentity)
      }
    },
    ...mapMutations(['setUserIdentity'])
  }
}
</script>

<style lang="scss">
@import './assets/css/common.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body.modal-open {
    position: fixed;
    width: 100%;
}

</style>
