<template>
  <div id="container" class="amap"></div>
  <div class="bottom">

    <div class="tab">
      <van-tabs v-model:active="state.activeName">
        <van-tab title="现在" name="0">
          <div class="content">
            <div class="item">
                <span class="circle green"></span>
                <div data-name='start' class="item-input last input-placeholder-time" @click="inputAddress">
                  {{state.startPlace}} 
                  <van-image class="arrow-img" hidden="{{serviceTimeStr}}" src="/src/images/address/arrow.png"></van-image>
                </div>
                <p class="tip">为您推荐附近的最佳上车点</p>
            </div>
            <div class="item end-item">
                <span class="circle orange"></span>
                <div data-name='end' class="item-input end-pos last input-placeholder-end" @click="inputAddress">{{state.endPlace || endDefaultStr}}</div>
            </div>
            <div class="history" v-if="history.length">
              <div v-for="item in history" :key="item.addressId" @click="selectAddress" class="detail-con">
                {{item.position}}
              </div>
            </div>
          </div>

        </van-tab>
        <van-tab title="预约" name="1">
          <div class="content">
            <!-- <div class="item">
              <van-image class="time-img" src="/src/images/address/time.png"></van-image>
              <div data-name='time' class="item-input input-placeholder-time" @click="timeSelect">
                {{serviceTimeStr || defaultStr}} 
                <van-image class="arrow-img" hidden="{{serviceTimeStr}}" src="/src/images/address/arrow.png"></van-image>
              </div>
            </div>
            <div class="item">
                <span class="circle green"></span>
                <div data-name='start' class="item-input last input-placeholder-time" @click="inputAddress">
                  {{startPlace}} 
                  <van-image class="arrow-img" hidden="{{serviceTimeStr}}" src="/src/images/address/arrow.png"></van-image>
                </div>
                <p class="tip">为您推荐附近的最佳上车点</p>
            </div>
            <div class="item end-item">
                <span class="circle orange"></span>
                <div data-name='end' class="item-input end-pos last input-placeholder-end" @click="inputAddress">{{endPlace || endDefaultStr}}</div>
            </div> -->
            <div class="history" v-if="history.length">
              <div v-for="item in history" :key="item.addressId" @click="selectAddress" class="detail-con">
                {{item.position}}
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="接送机" name="2">接送机</van-tab>
        <van-tab title="接送站" name="3">接送站</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {  reactive,onMounted } from 'vue'
import {history} from '@/data'
import locationUrl from '@/images/address/location.png'
// import AMap from 'AMap'
export default {
  name: 'home',
  data() {
    return {
      history,
      locationUrl,
      endDefaultStr: '您想去哪里？',
    }
  },
  setup() {
    
    const state = reactive({
      map: null,
      centerpoint: null,
      activeName: '0',
      currentData: null,

      text: null,
      marker: null,
      content: '<div class="text-center">在这里上车</div>',

      startCity: '',
      startPlace: '',
      startLatLng: [0,0],
      endCity: '',
      endPlace: '',
      endLatLng: [],
    })

    const initMap = () => {
      state.map = new AMap.Map("container", {
        // center: state.centerpoint,
        animateEnable: true,
        zoom: 12
      });

      state.text = new AMap.Marker({
        content: state.content,
        offset: new AMap.Pixel(-35, -56),
      });
      state.marker = new AMap.Marker({
        icon: locationUrl,
      });

      //移动地图时触发
      state.map.on('moveend', (e) => {
        console.log('moveend',state.map.getCenter())
        let center = state.map.getCenter()
        let lnglatXY = [center.lng, center.lat];// 地图上所标点的坐标
        AMap.service('AMap.Geocoder', function() {// 回调函数
            let geocoder = new AMap.Geocoder({});
            geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // console.log(result.regeocode.formattedAddress);
                    // var address = result.regeocode.formattedAddress;
                    console.log(result);
                } else {
                }
            });
        });
      });
    }

    const getLngLatLocation = () => {
      AMap.plugin('AMap.CitySearch', () => {
        let citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            // state.currentData = result.bounds.northeast
            console.log('定位getLngLatLocation：', result);
          }
        })
      })
    }

    // 获取当前位置
    const getPosition = () => {
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          // extensions: 'all'
        });
        geolocation.getCurrentPosition((status, result) => {
          if (result && result.position && result.addressComponent) {
            console.log('0000', result)
            state.centerpoint = result.position
            state.map.setCenter(result.position)


            state.startCity = result.addressComponent.city
            state.endCity = result.addressComponent.city
            state.startPlace = result.formattedAddress.replace(result.addressComponent.city,'').replace(result.addressComponent.province,'')
            // console.log(result.formattedAddress.replace(result.addressComponent.city,''))

            //
            state.text.setPosition(result.position)
            state.marker.setPosition(result.position)
            state.map.add(state.text);
            state.map.add(state.marker);




          }
        });
      });
    }

    // 设置中心点
    onMounted(() => {
      getPosition()
      initMap();
    });

    return {
      state,
      initMap,
    }
  }

}
</script>

<style>
.amap {
  width: 100vw;
  height: 100vh;
}

.amap-copyright {
  display: none!important;
}

.amap-icon img {
  display: inline-block;
  margin-top: 4px;
  width: 38px;
  height: 42px;
}


.text-center {
  width: 84px;
  height: 30px;
  line-height: 30px;
  background: #fefffe;
  border-radius: 40rpx;
  text-align: center;
  font-size: 24rpx;
  font-family: 'PingFangSC', 'PingFangSC-Regular';
  font-weight: 400;
  color: #666;
  box-shadow: 0 2px 16px rgb(0, 0, 0, .06);
}

.bottom {
    position: fixed;
    z-index: 1;
    bottom: 0;
    text-align: right;
    width: 100%;
    background: #fff;
}

.tab {
    width: 100%;
    padding: .48rem 0 0;
    background: #ffffff;
    border-radius: 16px 16px 0px 0px;
    box-shadow: 0px -10px 12px 0px rgba(238,238,238,0.8);
    background: #fff;
    width: 100%;
    text-align: left;
}

.top {
  width: 100vw;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 5;
  text-align: center;
  background: #fff;
  /* padding-top: 63rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: .30rem;
}

.person-img {
  width: .78rem;
  height: .78rem;
  position: absolute;
  left: .22rem;
  /* position: absolute;
  left: 22rem;
  top: 84rem; */
}
.img-center {
  display: inline-block;
  margin-top: 4px;
  width: 38px;
  height: 42px;
}

.map-index {
  width: 100%;
  height: 100%;
}


.center-marker {
  position: absolute;
  left: 50%;
  top: calc( 50% - 40px);
  transform: translate(-50%, -50%);
  /* height: 70px; */
  text-align: center;
}
.text-center {
  width: 84px;
  height: 30px;
  line-height: 30px;
  background: #fefffe;
  border-radius: .40rem;
  text-align: center;
  font-size: .24rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #666;
  box-shadow: 0 2px 16px rgb(0, 0, 0, .06);
}
.img-center {
  display: inline-block;
  margin-top: 4px;
  width: 38px;
  height: 42px;
}

.bottom-area {
  position: fixed;
  z-index: 1;
  bottom: 0;
  text-align: right;
  width: 100%;
}
.img-location {
  width: .72rem;
  height: .72rem;
  margin-bottom: .16rem;
  margin-right: .24rem;
}
.input-area { 
  width: 100%;
  padding: .48rem 0 0;
  background: #ffffff;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px -10px 12px 0px rgba(238,238,238,0.8); 
  /* position: fixed;
  z-index: 1;
  bottom: 0; */
  background: #fff;
  width: 100%;
  text-align: left;
}

.end-pos {
  margin-top: .30rem;
}

.switch-type {
    display: flex;
    justify-content: space-evenly;
    height: .40rem;
    line-height: .40rem;
    position: relative;
  }
  
.type-item {
  font-size: .28rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #666977;
}
  
.type-item.active {
  color: #333;
  font-size: .32rem;
  font-weight: 700;
  position: relative;
}

.type-item.active::after {
  content: "";
  display: block;
  left: 15%;
  width: 70%;
  height: .06rem;
  background: #4780f7;
  border-radius: .04rem;
  position: absolute;
  margin-top: .12rem;
}

.content {
  width: 100%;
  padding: 0 .40rem .08rem;
  margin-top: .34rem;
}

input {
  /* width: 100%;
  height: 80rem;
  padding-left: 16rem; */
  font-weight: normal;
  /* letter-spacing: 4rem; */
}

.item {
  position: relative;
}
.item-input {
  height: 1.08rem;
  line-height: 1.08rem;
  margin-left: .64rem;
  border-bottom: .5px solid #ebebeb;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.tip {
  position: absolute;
  font-size: .22rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #44d39e;
  left: .64rem;
  bottom: .24rem;
}

.last {
  border: 0px;
}

.circle {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  top: .44rem;
  left: .20rem;
}

.green {
  background: #44d39e;
}

.orange {
  background: #FEB001;
}

.end-item {
  background: #f2f4f7;
  border-radius: .16rem;
  margin-top: .40rem;
}

.input-placeholder-time {
  color: #8d8d8d;
  font-size: .28rem;
  line-height: 1.08rem;
  display: flex;
  align-items: center;
}

.arrow-img {
  width: .12rem;
  height: .20rem;
  margin-left: .12rem;
}

.input-placeholder-end {
  font-size: 18px;
  font-weight: 700;
  color: #262626;
}

.input-placeholder {
  display: flex;
  align-items: center;
}

.time-img {
  width: .28rem;
  height: .28rem;
  position: absolute;
  top: .42rem;
  left: .16rem;
}

.history {
  width: 100%;
  /* height: 74rem; */
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  /* margin-top: .24rem; */
}

.detail-con {
  display: inline-block;
  background: #f8f9fb;
  border-radius: 3px;
  padding:.10rem .16rem;
  font-size: .24rem;
  font-weight: 400;
  color: #9698a1;
  margin-right: .16rem;
}

.custom-callout {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #4780f7;
  line-height: 12px;
}

/* 接送机 */
.type-sel {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0 12px; 
  /* 有航班号是32 */
}

.item-type {
  display: inline-block;
  font-size: .28rem;
  line-height: .28rem;
  color: #666;
}

.active-type {
  border: 1px solid #4780f7;
  border-radius: 12px;
  padding: 5px 10px;
  color: #4780f7;
}

.no-flyno {
  display: inline-block;
  position: absolute;
  color: #8d8d8d;
  right: .32rem;
  font-size: .26rem;
  line-height: .26rem;
  top: 0;
  z-index: 2;
  height: 1.08rem;
  line-height: 1.08rem;
}

/* 接送机 */

.fly-info-item {
  padding: .26rem 0;
  border-bottom: .5px solid #ebebeb;

}
.fly-info {
  margin-left: .64rem;
  color: #333333;
  line-height: .28rem;
  font-size: .28rem;
  /* width: 220px; */
}

.fly-time-info {
  margin-left: .64rem;
  color: #666666;
  line-height: .26rem;
  font-size: .26rem;
  margin-top: 5px;
}






</style>