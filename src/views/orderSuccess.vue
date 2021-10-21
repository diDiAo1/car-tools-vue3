<template>
<div class="order-success">
  <van-image class="success-img" src="/src/images/order/success.png"></van-image>
  <div class="title">下单成功</div>
  <div class="sub-title">已通知车队安排司机</div>
  <div class="sub-sub-title">司机接单后，司机信息也将短信发送给您，注意查收</div>
  <div class="btn-view">
    <div class="btn" @click="divDetail">查看详情</div>
    <div class="btn" @click="backHome">回到首页</div>
  </div>
  <!-- <button bindtap="divDetail" type="primary"></button>
  <button bindtap="backHome" type="primary">回到首页</button> -->
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

    const divDetail = () => {
      router.push({name:"orderDetail"})
    }

    const backHome = () => {
      router.push({name:"home"})
    }

    
    return {
      divDetail,
      backHome
    }
  }
}
</script>

<style scoped>
.order-success {
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
}

.success-img {
  width: 1.08rem;
  height: 1.08rem;
  margin-top: .76rem;
}

.title {
  margin-top: .32rem;
  color: #333;
  font-weight: 700;
  font-size: .36rem;
}

.sub-title {
  margin-top: .16rem;
  color: #333;
  font-size: .28rem;
}

.sub-sub-title {
  margin-top: .32rem;
  font-size: .26rem;
  color: #8d8d8d;
}

.btn-view {
  margin-top: .56rem;
  display: flex;
  justify-content: center;
  padding: 0 .48rem;
}

.btn {
  width: 150px;
  height: .80rem;
  line-height: .80rem;
  background: #ffffff;
  border: 1px solid #4780f7;
  border-radius: 4px;
  color: #4780f7;
  font-size: .28rem;
}

.btn + .btn {
  margin-left: .30rem;
}
</style>