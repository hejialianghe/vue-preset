<template>
  <div class="layout-main">
    <navigation-header class="navigation_head" :title="title"></navigation-header>
      <keep-alive>
        <transition :name="transitionName" v-if="$route.meta.keepAlive">
          <router-view class="Router"></router-view>
        </transition>
      </keep-alive>
      <transition :name="transitionName">
        <router-view class="Router" v-if="!$route.meta.keepAlive"></router-view>
      </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    $route: function (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      if (to.path === '/') {
        this.transitionName = 'slide-right'
      } else if (from.path === '/') {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  computed: {
    title: function () {
      return this.$route.meta.title || '暂未配置title'
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .layout-main{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .Router {
      position: absolute;
      width: 100%;
      transition: all 0.3s ease;
      top: 0px;
      height: 100%;
      padding-top: 86px;
      flex: 1;
      overflow: auto;
      background: #edf0f0;
    }

    .navigation_head{
      z-index: 10;
      background-color: #f6f6f6;
    }

    .slide-left-enter,
    .slide-right-leave-active {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      -webkit-transform: translate(-100%, 0);
      transform: translate(-100% 0);
    }
  }
</style>
