<template>
	<div id="app">
		<keep-alive :include="keepAliveArr">
			<router-view></router-view>
		</keep-alive>
		<Loading v-if="loadingStauts"></Loading>
	</div>
</template>

<script>
import Loading from "@/components/Loading/Loading";
import { mapState, mapMutations } from "vuex";
import MTAH5 from 'mta-h5-analysis'
export default {
  name: "App",
  data() {
    return {
      loadingStauts: false
    };
  },
  computed: {
    ...mapState(['keepAliveArr'])
  },
  created() {
    this.setUserInfo()
    this.bindEvent()
    if (process.env.VUE_APP_SERVEN === 'DEV') {
      this.registerVconsole()
    }
    this.registerTxTongji()
  },
  methods: {
    bindEvent() {
      global.vbus.$on('toast_show', resData => {
        this.$toast(resData)
      })
      global.vbus.$on('loading_show', status => {
        this.loadingStauts = status
      })
    },
    setUserInfo() {
      let token = this.getQueryString('token') || null
      let userId = this.getQueryString('userId') || null
      if (token && token !== 'null') {
        this.muUserMetaInfo({
          token: token, // 安卓这里是tokenID
          userId: userId
        })
      }
    },
    registerVconsole () {
       const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://cdn.basestonedata.com/jlib/vconsole.last.min.js'
      document.getElementsByTagName('body')[0].appendChild(script)
      script.onload = () => {
        new VConsole() // eslint-disable-line
      }
    },
    registerTxTongji () {
      let sid, cid
      if (process.env.VUE_APP_SERVEN === 'DEV') {
        sid = '500665097'
        cid = '500665100'
      } else {
        sid = ''
        cid = ''
      }
      MTAH5.init({
        sid, // 必填，统计用的appid
        cid, // 如果开启自定义事件，此项目为必填，否则不填
        autoReport: 1, // 是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
        senseHash: 0, // hash锚点是否进入url统计
        senseQuery: 0, // url参数是否进入url统计
        'performanceMonitor': 1 // 是否开启性能监控
      })
      MTAH5.pgv()
    },
    ...mapMutations(['muUserMetaInfo'])
  },
  components: {
    Loading
  }
};
</script>
<style lang='scss'>
@import "assets/scss/base.scss";
</style>
<style>
#app {
  font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  -webkit-text-size-adjust: none;
}
img {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 100%;
}
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}
</style>
