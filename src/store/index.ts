// import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'


export const key = Symbol()

export const store = createStore({
  state() {
    return {
      count: 0,
      order: {
        // startPosition: [30.709643, 114.532044],//包含startLatitude和startLongitude
        // startPlace: '武汉生物工程学院', //出发地
        // startCity: '武汉',
        // endPosition: [30.461672, 114.418747], //包含endLatitude和endLongitude
        // endPlace: '江夏区当代国际花园时尚商业街6号楼B座', //目的地
        // endCity: '武汉',
        // orderTime: '', //下单时间
        startLatLng: [], //包含startLatitude和startLongitude
        startPlace: '', //出发地
        // startAddress: '', // sub开始地址
        startCity: '',
        // startCityId: '',
        endPosition: [], //包含endLatitude和endLongitude
        endPlace: '', //目的地
        endCity: '',
        // endCityId: '',
        // endAddress: '', // sub下车地址
        orderTimeYMD: '', //下单时间
        switchItem: 0,
        serviceType: 0,
        fly_no: '', //航班号/火车车次
        fly_info: '', //航班号/火车车次 信息
        fly_date: '', // 航班号或火车日期
        dep_code: '', // 起飞机场或火车站三字码
        arr_code: '', // 到达机场或火车站三字码
      }
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    change(data) {
      for(let i in data) {
        state.order[i] = data[i]
      }
    }
  }
})
