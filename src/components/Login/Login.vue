<template>
	<div class="login" v-if="loginStatus" @click.stop.self="resetLoginData">
		<div class="login__container">
			<div class="sms" v-show="loginShow">
				<div class="field van-hairline--bottom">
					<div class="input__wrap">
						<input v-model="phone" type="number" placeholder="请输入手机号">
					</div>
				</div>
				<div class="field van-hairline--bottom">
					<div class="input__wrap">
						<input v-model="sms" type="number" placeholder="请输入短信验证码">
						<div @click="sendSms" :class="{disabled: verCodeStatus === 1}">
							<span>{{btnDesc}}</span>
						</div>
					</div>
				</div>
				<div class="confirm" :class="{canNologin: !canLogin}" @click="phoneValidate">
					<span>确定</span>
				</div>
			</div>
			<div class="imgSms" v-show="imgAuthCodeShow">
				<div class="field van-hairline--bottom">
					<div class="input__wrap">
						<input v-model="imgSms" type="text" placeholder="请输入图形验证码">
						<div class="imgContent">
							<img :src="imgAuthCodeSrc" alt="">
						</div>
					</div>
				</div>
				<div class="confirm" :class="{canNologin: !canCloseImgAuth}" @click="imgValidate">
					<span>确定</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters, mapMutations } from 'vuex'
import formChecker from '@/module/formChecker'
import { ModalHelper } from '@/module/common'

export default {
  name: '',
  props: ['registerType'],
  data () {
    return {
      loginShow: false, // 是否显示登录弹层
      imgAuthCodeShow: false, // 是否显示图形验证码弹层
      phone: '', // 手机号
      sms: '', // 短信验证码
      imgSms: '', // 短信验证码
      phoneErrorMsg: '', // 手机号输入错误提示
      smsErrorMsg: '', // 短信验证码输入错误提示
      imgErrorMsg: '', // 图形验证码输入错误提示
      verCodeStatus: 0, // 0 获取验证码 1 倒计时 2 重新获取
      imgAuthCodeSrc: '', // 图形验证码url
      btnDesc: '获取验证码', // 按钮文字
      timer: null
    }
  },
  computed: {
    canLogin () {
      return formChecker.checkPhoneAndVerCode(this.phone, this.sms)
    },
    canCloseImgAuth () {
      return formChecker.checkAuthCode(this.imgSms)
    },
    ...mapState(['loginStatus']),
    ...mapGetters(['openId'])
  },
  methods: {
    // 重置登录框
    resetLoginData (isAll) {
      this.loginShow = false
      this.imgAuthCodeShow = false
      this.setLoginStatus(false)
      if (isAll === true) {
        this.phone = ''
        this.sms = ''
        this.imgSms = ''
        this.imgAuthCodeSrc = ''
        this.verCodeStatus = 0
        clearInterval(this.timer)
      }
    },
    // 倒计时
    countDown () {
      this.btnDesc = '60S'
      this.timer = setInterval(() => {
        let seconds = this.btnDesc.replace('S', '')
        seconds--
        this.btnDesc = seconds + 'S'
        if (seconds === 0) {
          clearInterval(this.timer)
          this.verCodeStatus = 2
          this.btnDesc = '重新获取'
        }
      }, 1000)
    },
    // 短信验证码验证
    async phoneValidate () {
      try {
        if (!this.canLogin) return
        if (this.isWx) {
          // 微信环境登录
          await this.wxbindLogin()
        } else {
          // 普通浏览器登录
          await this.login()
        }
        this.$emit('loginGo')
        this.resetLoginData(true)
      } catch (error) {
        let message = error && error.heads && error.heads.message
        this.$toast(message)
        this.resetLoginData()
      }
    },
    // 图形验证码验证
    imgValidate () {
      // 验证图形验证码
      if (!this.canCloseImgAuth) {
        this.$toast('亲，请输入四位图形验证码')
      } else {
        // 获取登录结果
        this.sendSms(1)
      }
    },
    // 发送短信验证码
    sendSms (isImgSms) {
      // 1.判断是否为倒计时状态
      if (this.verCodeStatus === 1) {
        return false
      }
      // 2.判断是否有手机号
      if (!this.phone) {
        this.$toast('手机号不能为空')
        return false
      }
      if (!formChecker.checkPhone(this.phone)) {
        this.$toast('手机号输入有误,请重新输入')
        return false
      }
      let smsBody = {
        mobile: this.phone
      }
      if (isImgSms) smsBody.authCodeName = this.imgSms
      return global.ajax.post('v2/sms/getLoginSmsCode.json', smsBody)
        .then(async res => {
          const code = res.heads.code
          if (code === 200) { // 短信发送成功
            this.verCodeStatus = 1
            this.$toast('短信发送成功')
            if (isImgSms) {
              this.imgAuthCodeShow = false
              this.loginShow = true
              this.imgSms = ''
              this.imgAuthCodeSrc = ''
            }
            this.countDown()
          } else if (code === 1003) { // 获取图像验证码
            await this.getImgAuthCode()
            this.loginShow = false
            this.imgAuthCodeShow = true
          } else if (code === 1002) { // 图片验证码错误
            this.$toast('图片验证码错误')
            await this.getImgAuthCode()
            this.loginShow = false
            this.imgAuthCodeShow = true
          } else {
            this.$toast(res.heads.message)
          }
        }).catch(err => {
          this.$toast(err)
        })
    },
    // 获取图形验证码
    getImgAuthCode () {
      return global.ajax.get('v2/writeImages', { params: { mobile: this.phone }, responseType: 'blob' })
        .then(response => {
          console.log(response instanceof Blob)
          if (response instanceof Blob) {
            let imgUrl = window.URL.createObjectURL(response)
            this.imgAuthCodeSrc = imgUrl
          }
        })
    },
    // 普通方式登录
    login () {
      let params
      let inviterId = this.getQueryString('suid')
      params = { mobile: this.phone, verCode: this.sms, registerType: this.registerType }
      if (inviterId) {
        params.encryptInvitationUserId = inviterId
      }
      return this.$api['user/gustLogin'](params)
        .then(res => {
          res.userId = res.suserId
          this.muUserMetaInfo(res)
        })
    },
    // 微信绑定登录
    wxbindLogin () {
      // console.log('微信绑定登录')
      let openId = this.openId
      if (!openId) {
        // 并未能够获取微信
        this.$toast('未发现微信绑定数据，无法登录')
        return
      }
      return this.$api['user/bindingMoble']({
        code: this.sms,
        openId,
        phoneNo: this.phone,
        registerType: this.registerType
      }).then(data => {
        this.$tj('wx_bindLogin')
        this.muUserMetaInfo(data)
      })
    },
    ...mapMutations(['setLoginStatus'])
  },
  watch: {
    sms (val) {
      if (val && val.length > 6) {
        this.sms = val.slice(0, 6)
      }
    },
    imgSms (val) {
      if (val && val.length > 4) {
        this.imgSms = val.slice(0, 4)
      }
    },
    phone (val) {
      val = val || ''
      let mobile = val.toString()
      if (mobile && mobile.length > 11) {
        this.phone = Number.parseInt(mobile.slice(0, 11))
      }
    },
    loginStatus (val) {
      if (val && !this.loginShow && !this.imgAuthCodeShow) {
        this.loginShow = true
        ModalHelper.afterOpen()
      } else {
        ModalHelper.beforeClose()
      }
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
.disabled {
  background: #f2f2f2 !important;
  color: #999 !important;
}
.login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.5);
}
.login__container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.sms {
  padding: 50px;
  border-radius: 20px;
  background-color: #fff;
  .field {
    position: relative;
    padding: 25px 10px;
    text-align: left;
    .input__wrap {
      position: relative;
      height: 50px;
      input {
        display: inline-block;
        margin-top: 1px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        color: #999999;
        line-height: 40px;
      }
      div {
        position: absolute;
        top: 0px;
        right: 0;
        width: 176px;
        background: rgba(227, 20, 54, 1);
        border-radius: 24px;
        color: #fff;
        padding: 9px 0;
        text-align: center;
        span {
          display: inline-block;
          height: 33px;
          font-size: 24px;
          font-family: PingFangSC-Regular;
          color: rgba(255, 255, 255, 1);
          line-height: 33px;
        }
      }
    }
  }
  .confirm {
    width: 490px;
    background-color: #e31436;
    border-radius: 8px;
    padding: 22px 0;
    margin-top: 50px;
    &.canNologin {
      background: #ffabc1;
    }

    span {
      display: inline-block;
      height: 45px;
      font-size: 32px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
    }
  }
}
.imgSms {
  padding: 50px;
  border-radius: 20px;
  background-color: #fff;
  .field {
    position: relative;
    padding: 25px 10px;
    text-align: left;
    .input__wrap {
      position: relative;
      height: 50px;
      input {
        display: inline-block;
        margin-top: 1px;
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        color: #999999;
        line-height: 40px;
      }
      .imgContent {
        position: absolute;
        right: 0;
        top: -10px;
        width: 2.773333rem;
        height: 60px;
      }
    }
  }
  .confirm {
    width: 490px;
    background-color: #e31436;
    border-radius: 8px;
    padding: 22px 0;
    margin-top: 50px;
    &.canNologin {
      background: #ffabc1;
    }
    span {
      display: inline-block;
      height: 45px;
      font-size: 32px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
    }
  }
}
</style>
