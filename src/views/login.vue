<template>
  <div class="login">
    <div class="view-img">
      <van-image class="login-img" :src="state.logoUrl"></van-image>
    </div>
    <van-button color="linear-gradient(90deg,#61f380, #07ce67)" block @click="login">
      登录
    </van-button>
    <div class="login-btm">
      <!-- <checkbox class="login-checkbox {{checked ? 'checked' : ''}}" bindtap="checkboxTap"/> -->
      <van-image class="sel-img" v-show="!state.select"  @click="select" src='/src/images/login/unselect.png' ></van-image>
      <van-image class="sel-img" v-show="state.select"  @click="select" src='/src/images/login/selected.png' ></van-image>
      <text @click="select">我已阅读并同意</text><text style="color:#54CC77">《用户隐私协议》</text>
      <!-- <navigator class='total' url="">《用户隐私协议》</navigator> -->
    </div>
  </div>
</template>

<script>
import router from '../router'
import logoUrl from '@/images/login/logo.png'
import {  reactive } from 'vue'
export default {
  name: 'login',
  data() {
    return {
    }
  },
  setup() {

    const state = reactive({
      select: false,
      logoUrl,
    })

    const login = () => {
      router.push({name:"home"})
    }

    const select = () => {
      state.select = ! state.select
    }

    
    return {
      state,
      login,
      select
    }
  }
}
</script>

<style>
Page {
  background-color: #fff;
  overflow: hidden;
}

.login {
  padding: 1.66rem .60rem 0;
}

.view-img {
  width: 100%;
  text-align: center;
}

.login-img {
  width: 4.84rem;
  height: 2.4rem;
  margin-bottom: 1.60rem;
}

.login-img-param {
  width: 1.60rem;
  height: 1.60rem;
  margin-bottom: .12rem;
}
.logo-param {
  font-size: .38rem;
  font-weight: 700;
  text-align: center;
  color: #333333;
  margin-bottom: .34rem;
}
.conten-param {
  color: #8d8d8d;
  font-size: .26rem;
  text-align: center;
  margin-bottom: 2.02rem;
}
.conten-param text {
  margin-right: .24rem;
  vertical-align: middle;
}
.icon-img-param {
  width: .28rem;
  height: .28rem;
  vertical-align: middle;
  margin-right: .08rem;
}

/* .view-login {
  width: 100%;
} */

#login-button {
  width: 100%;
  /* background: #54cc77; */
  border-radius: 4px;
  height: .90rem;
  font-size: .32rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  line-height: .90rem;
  padding: 0;
}

.weixin-img {
  width: .40rem;
  height: .40rem;
  vertical-align: middle;
}

.wx-checkbox-input {
  display: none;
  /* display: none; 覆盖CheckBox样式 */
}

.login-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #cccccc;
  border-radius: 100%;
  margin-right: .08rem;
  margin-top: .06rem;
}

.sel-img {
  width: .34rem;
  height: .34rem;
  margin-right: .08rem;
}

/* .checked {
  background-color: #54CC77;
  border-color: #54CC77;
  color: #fff;
  position: relative;
}

.checked::after {
  content: '';
  color: #fff;
  position: absolute;
  margin-left: -4px;
  margin-top: 4px;
  width: 9px;
  height: 4px;
  border-bottom: solid 1px curremtColor;
  border-left: solid 1px curremtColor;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
} */

.login-btm {
  margin-top:.40rem;
  height: .40rem;
  font-size: .28rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #8d8d8d;
  line-height: .40rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>