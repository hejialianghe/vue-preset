<template>
  <div class="home-main">
   <router-view></router-view>
    <van-tabbar v-model="activeIndex" class="bottom-tab-bar">
      <van-tabbar-item to="/home/affairSelect"><i class="am-icon-cd_swbl font30" style="margin-right:8px"></i><span class="font15">事务办理</span></van-tabbar-item>
      <van-tabbar-item to="/home/userInfo"> <i class="am-icon-cd_wdbl font30" style="margin-right:8px"></i><span class="font15">个人中心</span></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {},
  mounted () {
    this.$api['user/GetAffairsSubjectDic']().then(res => {})
  },
  components: {},
  methods: {
  }
}
</script>
<style lang="scss">
.home-main {
  font-size: 28px;
  background-color: #eff2f2;
  min-height: 100vh;
  position: relative;
  .van-tabbar-item {
    &:first-child {
      border-right: 1px solid #eff0f0;
    }
    i {
      color: #5c5c5c;
    }
  }
  .van-tabbar-item--active {
    i,
    span {
      color: #009688;
    }
  }
  .head_local {
    padding-right: 10px;
    .head_local_icon {
      transform: rotate(90deg);
      position: relative;
      top: 1px;
    }
  }
  .bottom-tab-bar {
    height: 98px;
    border-top: 1px solid #eff0f0;
  }
}
</style>
