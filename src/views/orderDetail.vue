<template>
    <van-nav-bar
      title="订单详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="detail">

    <div class="top"> 
      <div class="top-header">{{orderStatusStr[state.order.activeName]}}<van-image class="arrow-img" src="/src/images/detail/arrow.png"></van-image></div>
      <div class="top-footer">
        <div class="driver">
          <div class="driver-top">
            <div><text class="car-num">{{state.order.carNumber}}</text><text class="driver-name">{{state.order.driverName}}</text></div>
            <div style="margin-top:.16rem;line-height: .26rem;">{{state.order.carColor}}·{{state.order.carName}}·{{state.order.seatNum}}座</div>
          </div>
          <van-image class="driver-img" src="/src/images/detail/driver.png"></van-image>
        </div>
        <div class="operate">
          <div class="operate-item" bindtap="orderCancel">
            <van-image src="/src/images/detail/cancle.png"></van-image>
            <div>取消订单</div>
          </div>
          <div class="operate-item" bindtap="tell">
            <van-image src="/src/images/detail/tell.png"></van-image>
            <div>打电话</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom show">
      <div class="line1">
        <text class="fleet-name">{{state.order.companyName}}</text><text class="car-level">{{state.order.carLevel}}</text>
      </div>
      <div class="line2"><van-image class="time-img" src="/src/images/detail/time.png"></van-image>{{state.order.serviceTime}}</div>
      <div class="line3"><van-image class="time-img" src="/src/images/detail/people.png"></van-image><text>{{state.order.rideNum}}人</text><text style="margin-left: .12rem;">{{state.order.userName}}</text><text style="margin-left: .12rem;">{{state.order.userPhone}}</text></div>
      <div class="line4" wx:if="{{state.order.demandLabel}}">用车要求：{{state.order.demandLabel}}</div>
    </div>
  </div>
</template>
<script>
// import router from '../router'
// import logoUrl from '@/images/login/logo.png'
import {orderStatusStr} from '@/data'
import {  defineAsyncComponent,reactive,onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute,useRouter } from "vue-router";
import { key } from '../store'
import { Toast } from 'vant';

export default {
  name: 'orderDetail',
  data() {
    return {
      orderStatusStr
    }
  },
  setup() {

    const state = reactive({
      order: {},
    })
    const store = useStore(key)
    const router = useRouter();

    const initData = () => {
      state.order = store.state.order
    }

    const onClickLeft = () => {
      router.back()
    }


    onMounted(() => {
      initData();
    });
    
    return {
      state,
      onClickLeft
    }
  }
}
</script>
<style scoped>


.detail{
  padding:.16rem;
  /* position: absolute; */
  background: #eee;
  z-index: 2;
  height: 100vh;
  overflow: hidden;
  /* bottom: .16rem;
  width: 100%; */
}


.top {
  background: rgba(255,255,255,.8);
  border-radius: 8px;
  width: 100%;
}
.top-header {
  width: 100%;
  padding:.32rem .36rem .32rem;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: .42rem;
}
.arrow-img {
  width: .12rem;
  height: .22rem;
  margin-left: .08rem;
}
.top-footer {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 #e4e4e4; 
}

.driver {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.driver-top {
  padding:.32rem .16rem .32rem .32rem;
  color: #333;
  font-size: .26rem;
}

.car-num {
  color: #333;
  font-weight: 700;
  font-size: .40rem;
  background-image: linear-gradient(270deg,rgba(198,214,247,0.28), #b8cfff);
  background-size:100% 7px;
  background-repeat:no-repeat;
  background-position:50% 70%;
}

.driver-name {
  color: #666;
  font-size: .28rem;
  margin-left: .12rem;
}
.driver-img {
  width: 1.14rem;
  height: 1.14rem;
  margin-right: .16rem;
}

.operate {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: .32rem 0;
  border-top:.5px solid #eee;
}

.operate-item {
  width: 1.00rem;
  text-align: center;
  color: #666;
  font-size: .22rem;
}
.operate-item image {
  width: .44rem;
  height: .44rem;
  margin-bottom: .12rem;
  display: inline-flex;
}
.bottom {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 #e4e4e4; 
  width: 100%;
  transition: all .5s;
  /* transition-property:max-height,margin-top;
  transition-duration:1s; */
  transition-timing-function:ease-in;
  /* max-height: 0; */
  max-height: 0;
  margin-top: 0;
  overflow: hidden;
}

.show {
  max-height: 240px;
  transition: all .5s;
  /* transition-property:max-height,margin-top;
  transition-duration:1s; */
  transition-timing-function:ease-in;
  margin-top: .16rem;
}

.fleet-name {
  font-size: .30rem;
  color: #333;
  font-weight: 700;
}

.car-level {
  margin-left: .12rem;
  padding: .01rem .08rem;
  height: .32rem;
  line-height: .32rem;
  font-size: .22rem;
  border-radius: 2px;
  font-size: .20rem;
  border: .5px solid #bbb;
  color: #999;
}
.line1 {
  margin: .44rem 0 0 .32rem;
  display: flex;
  align-items: center;
}
.line2 {
  margin-top: .24rem;
}
.line3 {
  margin-top: .16rem;
  margin-bottom: .28rem;
}
.line2,.line3 {
  color: #666;
  font-size: .28rem;
  line-height: .28rem;
  margin-left: .32rem;
  text-align: left;
}
.time-img {
  width: .24rem;
  height: .24rem;
  margin-right: .12rem;
}
.line4 {
  color: #666;
  font-size: .24rem;
  text-align: justify;
  word-break: break-all;
  margin-left: .32rem;
  margin-bottom: .32rem;
}

.no-driver {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px #e4e4e4; 
  padding: .36rem .40rem;
}

.no-driver-con {
  display: flex;
  justify-content: space-between;
}

.top-header-status {
  font-size: .36rem;
  line-height: .36rem;
  color: #333;
  font-weight: 700;
}

.status-sub {
  font-size: .28rem;
  line-height: .28rem;
  color: #8d8d8d;
  margin-top: .16rem;
}

.center-txt {
  /* position: absolute;
  left: 50%;
  top: calc( 50% - 50rem);
  transform: translate(-50%, -50%); */
  /* width: 110px; */
  /* height: 40rem; */
  box-sizing: border-box;
  background: rgba(0,0,0,0.6);
  border-radius: 2px;
  text-align: center;
  padding:0 6px;
  /* margin: 0 6px; */
  color: #fff;
  font-size: .22rem;

  /* max-width: 100%; */
  /* min-width: 150px; */
  height: 20px;
  line-height: 20px;
  display: inline-block;
  overflow: auto;
  z-index: 1;
  /* overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
</style>