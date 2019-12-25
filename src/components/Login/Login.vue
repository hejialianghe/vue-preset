<template>
   <div class="login_main">
    <div class="login_form">
      <div class="form_title">
        <p><img src="~@/assets/images/logo_03.png">澳门政务服务</p>
        <p><span>用户登陆</span></p>
      </div>
      <div class="form_input">
        <div :class="{ 'inputError': accountError, 'account-focus': accountFocus }">
          <van-field
            @input="accountError = false"
            @focus="onFocus(1)"
            @blur="onBlur(1)"
            v-model="user.account"
            placeholder="请输入您的登录账号"
            :error="accountError"
          >
            <i slot="left-icon" class="am-icon-zhanghao" />
          </van-field>
        </div>
        <div :class="{ 'inputError': pwdError, 'pass-focus': passFocus }">
          <van-field
            @input="pwdError = false"
            :readonly="readonly"
            @focus="onFocus(2)"
            @blur="onBlur(2)"
            v-model="user.pwd"
            type="password"
            placeholder="请输入您的登录密码"
            :error="pwdError"
          >
            <i slot="left-icon" class="am-icon-mima" />
          </van-field>
        </div>
        <div class="retrievePwd">
          找回密码
        </div>
      </div>
    </div>
    <div class="login_botton">
      <p>还没有注册账号？<span>立即注册 <i class="am-icon-xiangqing" /></span></p>
      <van-button :loading="loading" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import md5 from '@/module/md5.min.js'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      accountError: false,
      pwdError: false,
      loading: false,
      user: {
        account: '',
        pwd: ''
      },
      readonly: true,
      accountFocus: false,
      passFocus: false
    }
  },
  created () {},
  computed: {
  },
  methods: {
    onFocus (mark) {
      this.readonly = false
      if (mark === 1) {
        // 账号被focus
        this.accountFocus = true
      } else if (mark === 2) {
        // 密码被focus
        this.passFocus = true
      }
    },
    onBlur (mark) {
      if (mark === 1) {
        // 账号被focus
        this.accountFocus = false
      } else if (mark === 2) {
        // 密码被focus
        this.passFocus = false
      }
    },
    /**
     * 登陆
     * @param {string} account 用户名
     * @param {number} method
     * @param {string} password 密码
     */
    login () {
      this.$api['user/login'](
        {
          account: this.user.account,
          method: 0,
          password: md5(this.user.pwd)
        }, { noStringify: true }
      ).then(res => {
        let data = res.data[0]
        this.setUserIdentity({ access_token: data.access_token, refresh_token: data.refresh_token })
        this.getCurrUserInfo()
        this.$router.back()
      })
    },
    ...mapMutations(['setUserIdentity']),
    ...mapActions(['getCurrUserInfo'])
  }
}
</script>

<style scoped lang="scss">
  .login_main{
    height: 100%;
    background-color: #fff !important;
    box-sizing:border-box;
    .login_form{
      position: relative;
      top: 32%;
      transform: translateY(-50%);
      .form_title{
        text-align: center;
        margin-bottom: 100px;
        p{
          line-height: 50px;
          font-size: 35px;
          font-weight: bold;
          span{
            font-size: 30px;
            color: #888888;
            font-weight: normal;
          }
        }
        img{
          height: 34px;
          position: relative;
          top: 5px;
          margin-right: 10px;
        }
      }

      .form_input{
        padding: 0px 45px;
        > div {
          height: 100px;
          font-size: 32px;
          line-height: 100px;
          transition: 0.3s;
          border-bottom: 1px solid #e1e1e1;

          .van-field__left-icon{
            border-right: 1px solid #e1e1e1;
            padding-right: 34px;
            margin-right: 31px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .van-field__body{
            line-height: 58px;
          }

          input{
            font-size: 34px;
            color: #000;
            &::-webkit-input-placeholder{
              color: #e1e1e1;
            }
          }

          i{
            font-size: 34px;
            color: #000;
          }
        }
      }

      .retrievePwd{
        float: right;
        color: #009688;
        border-bottom: none !important;
      }

      .inputError{
        border-bottom: 1px solid red !important;

        i{
          transition: 0.3s;
          color: red;
        }
      }
      .account-focus,.pass-focus{
        border-bottom-color: #009688 !important;
        i{
          color: #009688 !important;
        }
      }
    }

    .login_botton{
      width: 100%;
      position: absolute;
      bottom: 0px;
      text-align: center;

      p{
        line-height: 100px;
        color: #b1b1b1;
        span, i{
          color: #009688;
        }
        span{
          font-size: 30px;
        }
        i{
          font-size: 24px;
        }
      }
      button{
        width: 100%;
        border: none;
        background-color: #009688;
        span{
          color: white;
          font-size: 34px;
        }
      }
    }
  }
</style>
