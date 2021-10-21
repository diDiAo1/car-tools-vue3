<template>
<div class="map-index">
  
  <div id="mapOrder" class="amap"></div>

  <div style="position: fixed;bottom: 0;width: 100vw;">
    <div class="fleet-area">
      <div class='switch-type'>
        <van-swipe :loop="false" :width="100">
          <van-swipe-item class="swipe-item" v-for="item in state.carTypeList" :key="item.carLevel" @click="selectType(item)">
            <div class="switch-item" :class="{'active':state.activeTypeIndex === item.carLevel}">
                <div class="switch-item-con">
                  <div class="title">{{item.name}}</div>
                  <van-image class="car-type" :src="item.srcName"></van-image>
                </div>
                <van-image v-show="state.activeTypeIndex == item.carLevel" class="select-type-img" src="/src/images/order/select-icon.png"></van-image>
              </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="order-detail">
        <div @click="state.timeVisible=true" class="text-button">{{state.serviceTime || '用车时间'}}
          <van-image class="arrow-img" src="/src/images/order/arrow.png"></van-image>
        </div>
        <div @click="state.userNameShow=true" class="text-button"><text class="text-num">{{state.rideNum}}人</text>
          <text style="text-overflow: ellipsis;overflow: hidden;white-space:nowrap;;">{{state.userName || '选乘车人'}}</text>
          <van-image class="arrow-img"  src="/src/images/order/arrow.png"></van-image>
        </div>
        <div @click="state.demandLabelShow=true" class="text-button">
          <text style="text-overflow: ellipsis;overflow: hidden;white-space:nowrap;;">{{state.demandLabel || '用车要求'}}</text>
          <van-image class="arrow-img"  src="/src/images/order/arrow.png"></van-image>
        </div>
      </div>
      <div class="submit" :class="{'disabled':!(state.userName && state.userPhone)}" @click="placeOrder">确认</div>
    </div>
  </div>

  <Time
    :visible="state.timeVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
  </Time>
  <van-action-sheet v-model:show="state.userNameShow" title="确认乘客信息">
    <div class="user-info">
      <div style="padding: 0 .40rem;color:#333;font-size: .30rem;">
        <div class="user-num">
          乘车人数：
          <van-image @click="reduceNum" v-show="state.rideNumInput != 1" class="reduce-img" src="/src/images/order/reduce.png"></van-image>
          <van-image  v-show="state.rideNumInput == 1" class="reduce-img" src="/src/images/order/reduce_gray.png"></van-image>
          {{state.rideNumInput}}
          <van-image @click="addNum" v-show="state.rideNumInput != 9" class="add-img" src="/src/images/order/add.png"></van-image>
          <van-image  v-show="state.rideNumInput === 9" class="add-img" src="/src/images/order/add_gray.png"></van-image>
        </div>
        <div style="margin-top: .48rem;" class="input-div">
          <van-field v-model="state.userPhoneInput" readonly clickable @touchstart.stop="state.userPhoneInputShow = true"  label="" placeholder="请输入乘车人手机号" />
          <van-number-keyboard
            v-model="state.userPhoneInput"
            :show="state.userPhoneInputShow"
            :maxlength="11"
            @blur="state.userPhoneInputShow = false"
          />
        </div>
        <div class="input-div" style="margin-bottom:.48rem;">
          <van-field v-model="state.userNameInput" label="" placeholder="请输入乘车人姓名" />
        </div>
        <div style="margin-bottom: .64rem;" v-if="state.historyList.length">
          <div style="font-size:700">历史乘车人</div>
          <div style="display:flex;flex-wrap: wrap;justify-content: space-between;">
            <div v-for="item in state.historyList" :key="item.contactId" class="history-item" @click="selectUser(item)">
              <div style="width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"><text>{{item.contactName}}</text> {{item.contactPhone}}</div>
              <van-image bindtap="delete" class="delete-img" src="/src/images/order/delete.png"></van-image>
            </div>
          </div>
        </div>
      </div>
      <div style="padding: 0 .40rem .24rem;">
        <div class="submit" :class="{'disabled':!(state.userNameInput && state.userPhoneInput)}" @click="sureUserInfo">确认</div>
      </div>
    </div>
  </van-action-sheet>

  <van-action-sheet v-model:show="state.demandLabelShow" title="用车要求">
     <van-field
        v-model="state.demandLabelInput"
        rows="6"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="请输入用车要求"
        show-word-limit
      />
      <div style="padding: 0 .40rem .24rem;">
        <div class="submit" :class="{'disabled':!(state.demandLabelInput)}" @click="sureDemand">确认</div>
      </div>
  </van-action-sheet>
<div id="panel" style="visibility:hidden"></div>
</div>
</template>

<script>
import {carTypeList,historyList} from '@/data'
import {formatTime} from '@/utils/util'
import {  defineAsyncComponent,reactive,onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'
import { useRoute,useRouter } from "vue-router";
export default {
  name: 'mapOrder',
  components: {
    Time: defineAsyncComponent(() => import("@/components/Time.vue")),
    // Footer: defineAsyncComponent(() => import("@/components/Footer.vue")),
  },
  setup() {
    
    const state = reactive({
      map: null,
      centerpoint: null,

      carTypeList,
      activeTypeIndex:1,
      rideNum:1,
      userName:'',
      userNameShow: false,
      demandLabel: '',
      demandLabelShow: false,
      demandLabelInput: '',
      // serviceTime:'2021-10-14 14:00',
      serviceTime:'',
      timeVisible: false,

      historyList,
      userPhoneInput:'',
      userNameInput:'',
      rideNumInput:1,
      userPhoneInputShow:false,

      carLevel: '经济型',
    })

    const initMap = () => {
      state.map = new AMap.Map("mapOrder", {
        // center: state.centerpoint,
        animateEnable: true,
      });
    }

    const store = useStore(key)
    const initData = () => {
      console.log(store.state.order)
      if (store.state.order.startLatLng.length == 2 && store.state.order.endLatLng.length == 2) {
          let driving = new AMap.Driving({
              map: state.map,
              panel: "panel"
          }); 
          // 根据起终点经纬度规划驾车导航路线
          driving.search(new AMap.LngLat(store.state.order.startLatLng[0], store.state.order.startLatLng[1]), 
          new AMap.LngLat(store.state.order.endLatLng[0], store.state.order.endLatLng[1]), function(status, result) {
            console.log('0000',status)
              // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
              if (status === 'complete') {
                state.map.setFitView()
                console.log('绘制驾车路线完成')
              } else {
                console.log('获取驾车数据失败：' + result)
              }
          });
      }
    }

    const selectType = data => {
      state.activeTypeIndex = data.carLevel
      state.carLevel = data.name
    }

    const handleOk = data => {
      state.serviceTime = formatTime(data)
      state.timeVisible = false
    }

    const handleCancel = () => {
      state.timeVisible = false
    }

    const reduceNum = () => {
      state.rideNumInput = state.rideNumInput - 1
    }

    const addNum = () => {
      state.rideNumInput = state.rideNumInput + 1
    }

    const selectUser = data => {
      state.userNameInput = data.contactName
      state.userPhoneInput = data.contactPhone
    }

    const sureUserInfo = () => {
      state.userNameShow = false
      state.rideNum = state.rideNumInput
      state.userName = state.userNameInput
      state.userPhone = state.userPhoneInput
    }

    const sureDemand = () => {
      state.demandLabelShow = false
      state.demandLabel = state.demandLabelInput
    }

    const router = useRouter();
    const placeOrder = () => {
      let {carLevel,rideNum,userName,userPhone,serviceTime,demandLabel} = state
      store.commit('change',{carLevel,rideNum,userName,userPhone,serviceTime,demandLabel})
      router.push({
        name:"orderSuccess"
      })
      console.log('changeOrder',store.state.order)
    }

    onMounted(() => {
      initMap();
      initData();
    });

    return {
      state,
      selectType,
      reduceNum,
      addNum,
      selectUser,
      sureUserInfo,
      handleOk,
      handleCancel,
      sureDemand,
      placeOrder
    }
  }
  
}
</script>
<style scoped>


#mapOrder {
  width: 100vw;
  /* height: calc(100% - 380rpx); */
  height: calc(100% - 5rem);
}

.user-info {
  /* position: fixed;
  z-index: 2; */
  width: 100%;
  background: #fff;
  border-radius: 12px 12px 0px 0px;
  /* transition: bottom 500ms; */
  text-align: left;
}

.user-num {
  margin-top: .40rem;
  line-height: .40rem;
  margin-bottom: .24rem;
}

.reduce-img,
.add-img {
  width: .40rem;
  height: .40rem;
  vertical-align: middle;
}

.reduce-img {
  margin-right: .28rem;
  margin-left: .16rem;
}

.add-img {
  margin-left: .28rem;
}

.input-div {
  height: .88rem;
  line-height: .88rem;
  margin-top: .24rem;
  background: #f2f4f7;
  border-radius: 4px;
  position: relative;
}

.input-div > div{
  background: #f2f4f7;
  border-radius: 4px;
}


.input-div input {
  height: 100%;
  margin-left: .24rem;
  font-weight: 400;
}


.history-item {
  width: 3.22rem;
  height: .76rem;
  line-height: .76rem;
  background: #f8f9fb;
  border-radius: 4px;
  font-size: .28rem;
  font-weight: 400;
  margin-top: .24rem;
  padding-left:.12rem;
  /* margin-right: 24rem; */
  position: relative;
}

.delete-img {
  position: absolute;
  width: .32rem;
  height: .32rem;
  top: -4px;
  right: -8px;
}

.history-item text {
  margin-right: .12rem;
}

.submit {
  width: 100%;
  height: .96rem;
  line-height: .96rem;
  font-size: .36rem;
  text-align: center;
  background: #4780f7;
  color: #fff;
  border-radius: 4px;
}

.disabled {
  background:rgba(71,128,247,0.4);
}


.map-index {
  width: 100%;
  height: 100%;
}


.bottom-btn {
  /* position: fixed; */
  /* bottom: 0px; */
  width: 100vw;
  /* height: 320rem; */
  background: #fff;
  padding: 0 .16rem .24rem;
  box-shadow: 0px -4px 12px 0px rgba(238, 238, 238, 0.5);
  font-size: .24rem;
  color: #666666;
  box-sizing: border-box;
}

.order-detail {
  display: flex;
  border-bottom: 1px solid #ebebeb;
  height: 1.04rem;
  line-height: 1.04rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
}

.text-button {
  font-weight: normal;
  padding: 0;
  font-size: .24rem;
  line-height: 1.04rem;
  color: #666666;
  display: flex;
  align-items: center;
  width:33.33%;
}

.text-num {
  /* border-right: 1px solid #ccc;
  
  padding-right: 16rem; */
  position: relative;
  margin-right: .16rem;
}

.text-num::before {
  content: '';
  position: absolute;
  width: 1px;
  height: 10px;
  background: #ccc;
  right: -.08rem;
  top: .42rem;
}

.arrow-img {
  width: .12rem;
  height: .20rem;
  margin-left: .08rem;
}

.submit {
  width: 100%;
  height: .96rem;
  line-height: .96rem;
  font-size: .36rem;
  text-align: center;
  background: #4780f7;
  color: #fff;
  border-radius: 4px;
  margin-top: .28rem;
  box-sizing: border-box;
}

.disabled {
  background:rgba(71,128,247,0.4);
}


.fleet-area {
  /* margin: 0 20rem; */
  /* position: fixed;
  bottom: 320rem; */
  width: 100%;
  padding: 0 .16rem;
  box-sizing: border-box;
}
.switch-type {
  background-color: #fff;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px -10px 12px 0px rgba(238,238,238,0.8); 
  width: 100%;
  height: 2.32rem;
  padding: .2rem .08rem .2rem .2rem;
  box-sizing: border-box;
}
.switch-item {
  /* width: 1.98rem; */
  height: 1.60rem;
  border: 2px solid #e8e6e6;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: .32rem;
  position: relative;
}
.switch-item-con {
  display: flex;
  flex-direction: column;
}
.active {
  border: 2px solid rgba(71,128,247,1);
}
.select-type-img {
  position: absolute;
  width: .32rem;
  height: .32rem;
  bottom: 0;
  right: -1px;
}
.title {
  color: #333333;
  font-size: .30rem;
  text-align: center;
  margin-bottom: .16rem;
}
.car-type {
  width: 1.60rem;
  height: .58rem;
}

.fleet {
  background-color: #fff;
  border-radius: 2px;
  height: 1.44rem;
  overflow-y: auto;
  margin: .10rem;
}

.fleet-item {
  padding: .10rem;
}

</style>