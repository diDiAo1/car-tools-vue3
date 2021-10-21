<template>
  <div id="container" class="amap"></div>
  
  <div class="center-marker">
      <p class="text-center">在这里上车</p>
      <van-image class="img-center" src="/src/images/address/location.png"></van-image>
  </div>

  
  <div class="search-bar">
      <div class="text-location" @click="chooseCity">{{state.city}}<van-image class="triangle-img" src="/src/images/address/triangle.png"></van-image></div>
      <!-- <input type="text"
              value="{{searchAdd}}"
              class="input-location"
              placeholder="{{placeholderTxt}}"
              bindinput='searchFocus'
              bindfocus='searchFocus'
              placeholder-style="color:#cccccc" />
      <div class="cancel-location" bindtap="cancel">取消</div> -->

      <van-search
        v-model="state.search"
        show-action
        :placeholder="placeholderTxt"
        @search="onSearch"
        @cancel="onCancel"
        style="flex-grow:1"
      />
      <div id="temp" style="display:none"></div>
  </div>


  <div class="search-result" v-if="state.searchResult.length">
      <div class="search-item" v-for="(item,index) in state.searchResult" @click='selectAddress(item)' :key="index">
          <van-image class="local-img" src="/src/images/address/local.png"></van-image>
          <div class="title">{{item.name}}</div>
          <div class="detail">{{item.address}}</div>
      </div>
  </div>
  
  <div class="bottom-btn">
      <div class="address">
          <span class="circle orange"></span>
          <div class="name">{{state.place}}</div>
          <div class="tip">{{tipTxt}}</div>
      </div>
      <!-- <button hover-class="none" bindtap="sure" id="sure-button" type="primary"></button> -->
      <div class="submit" @click="sure">{{btnTxt}}</div>
  </div>
</template>

<script>
import {  defineAsyncComponent,reactive,onMounted } from 'vue'
import {history} from '@/data'
import {formatTime} from '@/utils/util'
import router from '../router'
import { useRoute,useRouter } from "vue-router";
import { useStore } from 'vuex'
import { key } from '../store'
// import Time from '@/components/Time.vue'
// import AMap from 'AMap'
export default {
  name: 'addressSelect',
  components: {
    // Time: defineAsyncComponent(() => import("@/components/Time.vue")),
    // Footer: defineAsyncComponent(() => import("@/components/Footer.vue")),
  },
  data() {
    return {
      btnTxt: '确认下车地点',
      placeholderTxt: '请输入下车地址',
      tipTxt: '为您推荐附近的最佳下车点',
    }
  },
  setup() {
    
    const state = reactive({
      map: null,
      centerpoint: null,

      search: '',
      city: '',
      cityCode: '',
      place: '',
      searchResult: [],
      location: {},
      latLng: []
    })

    const initMap = () => {
      state.map = new AMap.Map("container", {
        // center: state.centerpoint,
        animateEnable: true,
        zoom: 15
      });

      //移动地图时触发
      state.map.on('moveend', (e) => {
        // console.log('moveend',state.map.getCenter())
        let center = state.map.getCenter()
        let lnglatXY = [center.lng, center.lat];// 地图上所标点的坐标
        AMap.service('AMap.Geocoder', function() {// 回调函数
            let geocoder = new AMap.Geocoder({});
            geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    console.log('moveend',result);
                    // state.city = result.regeocode.addressComponent.city
                    state.latLng = [center.lng, center.lat]
                    state.place = result.regeocode.formattedAddress.replace(result.regeocode.addressComponent.city,'').replace(result.regeocode.addressComponent.province,'')
                    // console.log(result.formattedAddress.replace(result.addressComponent.city,''))
                } else {
                }
            });
        });
      });
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
            // state.startCity = result.addressComponent.city
            // state.endCity = result.addressComponent.city
            // state.startPlace = result.formattedAddress.replace(result.addressComponent.city,'').replace(result.addressComponent.province,'')
            // console.log(result.formattedAddress.replace(result.addressComponent.city,''))
          }
        });
      });
    }

    const route = useRoute();
    const initData = () => {
      console.log('initData', route.query)
      state.city = route.query.city
      if (route.query.place) {
        state.cityCode = route.query.cityCode
        state.place = route.query.place
      } else {
        initCityCenter()
      }
    }

    const onSearch = () => {
      AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        let placeSearch = new AMap.PlaceSearch({ 
            pageSize: 10, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: state.city, // 兴趣点城市
            citylimit: true,  //是否强制限制在设置的城市内搜索
            panel: 'temp'//搜索结果的展示面板对元素id，不知道为什么一定要有该参数，最终获取的结果才更完整，参数更多跟完整，
            // autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        console.log(placeSearch)
        console.log(state.search)
        placeSearch.search(state.search, (status, result) => {
          console.log('0000000',result)
          if (status == 'complete' && result.info == 'OK') {
            state.searchResult = result.poiList.pois
          }
        });
      });
    }

    // 当前城市中心点
    const initCityCenter = () => {
      AMap.service('AMap.DistrictSearch',function(){//回调函数
          let opts = {
              subdistrict: 1,   //返回下一级行政区
              level: 'city',//查询的范围
              showbiz:false  //查询行政级别为 市
          };
          //实例化DistrictSearch
          let districtSearch = new AMap.DistrictSearch(opts);
          //TODO: 使用districtSearch对象调用行政区查询的功能
          districtSearch.search(state.city,function(status, result){
              //TODO : 按照自己需求处理查询结果
              if (result.info == 'OK' && result.districtList[0].center) {
                state.map.setZoomAndCenter(15,result.districtList[0].center)
              }
          })
      })
    }

    const selectAddress = (obj) => {
      state.location = obj.location
      state.place = obj.name
      state.searchResult =  []
      state.map.setCenter(state.location)
    }


    const sure = () => {
      changeOrder()
      router.push({
        name:"mapOrder",
        query: {
          city: state.city,
        }
      })
    }

    const router = useRouter();
    const chooseCity = () => {
      router.push({
        name:"cityList",
        query: {
          city: state.city,
        }
      })
    }

    const onCancel = () => {
      router.push({
        name:"home",
      })
    };

    const store = useStore(key)
    const changeOrder = () => {
      let {city:endCity, place:endPlace, latLng:endLatLng} = state
      store.commit('change',{endCity,endPlace,endLatLng})
      console.log('changeOrder',store.state.order)
    }


    // 设置中心点
    onMounted(() => {
      // getPosition()
      initMap();
      initData()
    });

    return {
      state,
      onSearch,
      selectAddress,
      sure,
      chooseCity,
      onCancel,
    }
  }

}
</script>

<style scoped>

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
  margin-top: 2px;
  width: 38px;
  height: 42px;
}



.search-bar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 1.04rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    font-size: 14px;
    /* box-shadow: 3px 5px 10px #e0e0e0; */
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.03); 
}
.cancel-location {
  padding:0 .24rem;
  flex: 0 0 auto;
  display: inline-block;
  color: #666;
  font-size: .30rem;
  color: #262626;
}
.input-location {
  position: relative;
  flex: 1 1 auto;
  display: inline-block;
  height: .68rem;
  background: #f2f4f7;
  border-radius: 4px;
  line-height: .68rem;
  padding-left: .24rem;
}
.input-location::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  width: 1px;
  height: 20px;
}
.text-location {
  padding-left: .24rem;
  padding-right: .26rem;
  flex: 0 0 auto;
  display: inline-block;
  /* height: 68rem;
  line-height: 68px; */
  text-align: center;
  font-size: .30rem;
  color: #262626;
  position: relative;
  display: flex;
  align-items: center;
}

.triangle-img {
  width: .16rem;
  height: .08rem;
  margin-left: .10rem;
}

/* .text-location::after {
    width: 0;
    height: 0;
    border-top: 5px solid;
    border-left: 4px solid;
    border-right: 4px solid;
    border-color: #333 transparent transparent;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 8px;
    content: '';
} */


.bottom-btn {
    position: fixed;
    bottom: 0;
    padding: 0 .16rem .16rem;
    width: 100%;
    box-sizing: border-box;
}

.address {
  background: #ffffff;
  border-radius: 4px;
  position: relative;
  /* width: 100%; */
  height: 1.28rem;
  padding-top: .32rem;
  padding-left: .64rem;
  padding-right: .32rem;
  font-size: .30rem;
  color: #333333;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.circle {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  top: .44rem;
  left: .24rem;
}
.orange {
  background: #FEB001;
}

.tip {
  position: absolute;
  font-size: .22rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #FEB001;
  left: .64rem;
}

/* #sure-button {
  width: 100%;
  font-size: 36rem;
  height: 96rem;
  line-height: 96rem;
} */


.submit {
  width: 100%;
  margin-top: .40rem;
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

.search-result {
  background: #fff;
  position: fixed;
  top: 1.00rem;
  z-index: 2;
  height: calc(100% - 52px);
  overflow-y: auto;
  width: 100%;
}

.search-item {
  position: relative;
  text-align: left;
  padding: .20rem 0 .20rem .48rem;
  margin-left: .24rem;
  border-bottom: .5px solid #ebebeb;
}


.time-img {
  width: .24rem;
  height: .24rem;
  position: absolute;
  top: .72rem;
  left: 0;
}
.local-img {
  width: .24rem;
  height: .32rem;
  position: absolute;
  top: .72rem;
  left: 0;
}

.title {
  font-size: .30rem;
  color: #333333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.detail {
  font-size: .24rem;
  color: #9698a1;
  margin-top: .16rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.custom-callout {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #4780f7;
  line-height: 12px;
}
</style>