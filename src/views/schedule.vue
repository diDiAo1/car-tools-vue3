<template>
    <van-nav-bar
      title="行程列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  <div style="width: 100vw;height: 100vh;">
  <div class="schedule">
      <div class="list" v-for="(item,index) in state.list" :key="index" bindtap="toDetail">
        <div class="item">
          <div class="line1">
            <div style="display: flex;align-items: center;align-items: center;">
              <text class="fleet-name">{{item.fleet}}</text>
              <!-- <template is="serviceType" data="{{item: item}}"/> -->
              <text class="service-type-str">{{item.serviceTypeName || item.serviceTypeDesc}}</text>
              <text class="car-level">{{item.carLevelName}}</text>
            </div>
            <div>
              <text class="status-desc">{{orderStatusStr[item.orderStatus]}}</text>
              <van-image class="arrow-img" src="/src/images/detail/arrow.png"></van-image>
            </div>
          </div>
          <div class="line2"><van-image class="time-img" src="/src/images/detail/time.png"></van-image>{{item.serviceTime}}</div>
          <div class="line3"><span class="circle green"></span>{{item.startPosition}}</div>
          <div class="line4"><span class="circle orange"></span>{{item.endPosition}}</div>
          <div class="line5"><van-image class="time-img" src="/src/images/detail/people.png"></van-image><span style="margin-right:.12rem">{{item.rideNum}}人</span><span>{{item.userName}}</span></div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import router from '../router'
import {  reactive } from 'vue'
import {list,orderStatusStr} from '@/data'
import { useRoute,useRouter } from "vue-router";
export default {
  name: 'schedule',
  data() {
    return {
      orderStatusStr
    }
  },
  setup() {

    const state = reactive({
      select: false,
      list,
    })

    const login = () => {
      router.push({name:"home"})
    }

    const select = () => {
      state.select = ! state.select
    }

    const router = useRouter();
    const onClickLeft = () => {
      router.back()
    }

    
    return {
      state,
      login,
      select,
      onClickLeft
    }
  }
}
</script>

<style scoped>
.schedule {
  padding:.20rem;
  /* width: 100vw;
  height: 100vh; */    
  min-height: 100%;
  background-color:#f6f7fa;
}
.top {
  font-size: .26rem;
  color: #333;
  padding-left: .08rem;
  display: flex;
  align-items: center;
}

.triangle-img {
  width: .16rem;
  height: .08rem;
  margin-left: .04rem;
}

.item {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.02); 
  margin-top: .20rem;
  padding: .32rem;
  font-size: .28rem;
  color: #666;
}

.list:first-child .item {
  margin-top:0;
}

.line1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 18px;
}

.fleet-name {
  font-size: .30rem;
  color: #333;
  font-weight: 700;
}

.car-level {
  margin-left: .12rem;
  padding: 0 .08rem;
  font-size: 10px;
  border-radius: 2px;
  height: 16px;
  line-height: 16px;
  border: .5px solid #bbb;
  color: #999;
}

.service-type-str {
  margin-left: .12rem;
  padding: 0 .08rem;
  font-size: 10px;
  border-radius: 2px;
  height: 16px;
  line-height: 16px;
}
.name1,.name2 {
  color: #4780F7;
  background:rgba(71,128,247,0.1);
  border: .5px solid#4780F7;
}
.name3,.name4 {
  color: #FEB001;
  background:rgba(254,176,1,0.1);
  border: .5px solid#FEB001;
}
.name5 {
  color: #43bb8f;
  background: rgba(0,196,124,0.1);
  border: .5px solid #43bb8f;
}

.arrow-img {
  width: .12rem;
  height: .20rem;
  margin-left: .12rem;
}

.line2 {
  margin-top: .32rem;
  font-size: .28rem;
  line-height: .28rem;
  text-align: left;
}

.time-img {
  width: .24rem;
  height: .24rem;
  margin-right: .12rem;
}

.line3 {
  margin-top: .24rem;
  font-size: .28rem;
  line-height: .28rem;
  display: flex;
  align-items: center;
}

.line4 {
  margin-top: .16rem;
  display: flex;
  align-items: center;
  font-size: .28rem;
  line-height: .28rem;
}
.circle {
  width: .12rem;
  height: .12rem;
  border-radius: 100%;
  margin-right: .20rem;
  margin-left: .04rem;
  display: inline-block;
}

.green {
  background: #44d39e;
}
.orange {
  background: #FEB001;
}

.line5 {
  margin-top: .32rem;
  font-size: .28rem;
  line-height: .28rem;
  text-align: left;
}

.bottom {
  margin:.40rem 0;
  text-align: center;
  font-size: .24rem;
  color: #666;
}

.no-data-img {
  width: 4.82rem;
  height: 2.76rem;
  margin-top: 1.96rem;
}

.nodata {
  margin-top: .60rem;
  font-size: .28rem;
  line-height: .40rem;
  color: #666;
  text-align: center;
}

.status-desc {
  color: #ff6814;
  line-height: .28rem;
  font-size: .28rem;
}

.disabled-desc {
  color: #bbbbbb;
}
</style>