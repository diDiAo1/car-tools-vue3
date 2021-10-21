<template>
  <div class='list-warpper'>
    <!-- 搜索框 -->
    <div class='list-search'>
        <form action="/" style="width:100%">
            <van-search
                v-model="inputValue"
                show-action
                placeholder="输入城市名称"
                @search="onSearch"
                @clear="onClear"
                @cancel="onCancel"
            />
        </form>
    </div>
    <!-- <div wx:if="{{config.suctionTop}}" class='fiexed-box list-title' style='transform: translateY(-{{moveDistance}}px);top:{{config.search?90:0}}rem'>
        {{list[listIndex].title}}
    </div> -->
    <!-- 搜索到所有数据的时候显示 -->
    <div v-if="state.cities.length" style="text-align:left;padding-top:50px;">
        <!-- <scroll-div class="list-scroll {{config.search?'top':''}}" scroll-y="true" scroll-into-div="{{jumpNum}}" scroll-with-animation="{{config.animation}}" bindscroll="scroll"> -->
            <!-- 当前城市  -->
            <!-- <div wx:if="{{cityName}}"> -->
            <div class="item">
                <div class='top-title'>当前城市</div>
                <div class='list-top'>
                    <div class='list-itme' v-if="state.city">
                        {{state.city}}
                    </div>
                </div>
            </div>

            
            <div class="item" v-if="state.hotCity">
                <div class='top-title'>{{state.hotCity.name}}</div>
                <div class='list-top'>
                    <div class='list-itme' v-for="item in state.hotCity.cities" :key="item.cityId"  @click="choose(item)">
                        {{item.cityName}}
                    </div>
                </div>
            </div>

            <van-index-bar :index-list="state.indexList">
                <template v-for="item in state.cities" :key="item.name">
                    <van-index-anchor :index="item.name">{{item.name}}</van-index-anchor>
                    <van-cell v-for="subItem in item.cities" :key="subItem.cityId" :title="subItem.cityName"  @click="choose(subItem)" />
                </template>
            </van-index-bar>
    </div>
    <!-- 没有搜索到数据的时候显示 -->
    <div v-else style="padding-top:50px;">
        <div class='nodata'>没有搜索到相关的数据哦</div>
    </div>
</div>
</template>
<script>
import {  defineAsyncComponent,reactive,onMounted,ref } from 'vue'
import {cities,hotCity} from '@/data'
import { useRoute,useRouter } from "vue-router";
import { Toast } from 'vant';

export default ({
  name: 'cityList',
  data() {
    return {
    //   cities,
    //   hotCity,
      
    }
  },
  setup() {
    
    const inputValue = ref('');

    const state = reactive({
      city: '',
      cities:cities,
      hotCity:hotCity,
      indexList: ["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    })
        //   let temp =  this.cities.filter(item => {
        //       item.name === '热门城市'
        //   })
        //   console.log('0000000000000')
        //   console.log(temp)

    const route = useRoute();
    const router = useRouter();
    const initData = () => {
        state.city = route.query.city
    }

    const onSearch = (val) => {
        state.hotCity = null
        let newData = []
        let newIndex = []
        for(let i = 0; i < cities.length; i++) {
            // let temp = cities[i].name
            let itemArr = [];
            for(let j = 0; j < cities[i].cities.length; j++) {
                if (cities[i].cities[j].cityName.indexOf(val) > -1) {
                    itemArr.push(cities[i].cities[j])
                }
            }
            if (itemArr.length === 0) {
                continue;
            }
            newData.push({
                name: cities[i].name,
                cities: itemArr
            })
            newIndex.push(cities[i].name)
        }
        console.log('000',newData)
        state.cities = newData
        state.indexList = newIndex
    };
    const onClear = () => {
        state.cities = cities
        state.hotCity = hotCity
        state.indexList = ["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    };
    const onCancel = () => {
      router.back()
    };

    const choose = (data) => {
      router.push({
        name:"addressSelect",
        query: {
          city: data.cityName,
          // place: state.startPlace,
          // cityCode: state.startCityCode,
          // city: '武汉市',
          // place: '武昌区中北路104号',
        }
      })
    }
    // 设置中心点
    onMounted(() => {
      initData()
    });


    return {
      state,
      inputValue,
      onSearch,
      onClear,
      onCancel,
      choose
    };
  },
})
</script>

<style scoped>
.list-warpper {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.list-search {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.04rem;
  padding: .18rem .24rem;
  box-sizing: border-box;
  z-index: 20;
  background: #FFF;
}
.item {
  padding:.40rem .32rem 0;
}
.top-title {
  font-size: .30rem;
  color: #333333;
  font-weight: 700;
  margin-bottom: .40rem;    
  padding-left: 0;
  background: #fff;
}
.list-top {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}

.list-itme {
  background: #f8f9fb;
  border-radius: 2px;
  width:1.54rem;
  height: .72rem;
  line-height: .72rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .28rem;
  color: #333;
  font-weight: 400;
  margin-right: .12rem;
}

.list-itme {
  margin-bottom: .20rem;
}

.van-index-anchor {
    text-align: left!important;
}
/* 无数据  */
.nodata {
  padding-top: 2.00rem;
  text-align: center;
  font-size: .32rem;
  color: #ddd;
}
</style>