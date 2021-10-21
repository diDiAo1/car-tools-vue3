<template>
    <van-nav-bar
      title="个人中心"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  <div class="person">
  <div class='header'>
    <div class='avatar'><van-image src="/src/assets/logo.png"></van-image></div>
    <div class='name'>13072139495</div>
  </div>
  <div>
    <div class="item" @click="toSchedule">
      <div><van-image class="person-img" src="/src/images/detail/trip.png"></van-image>行程</div>
      <van-image class="item-arrow" src="/src/images/detail/arrow.png"></van-image>
    </div>
    <div class="item" bindtap="quit">
      <div><van-image class="person-img" src="/src/images/detail/out.png"></van-image>退出登录</div>
      <van-image class="item-arrow" src="/src/images/detail/arrow.png"></van-image>
    </div>
  </div>
</div>
</template>

<script>
import router from '../router'
import logoUrl from '@/images/login/logo.png'
import {  reactive } from 'vue'
import { useRoute,useRouter } from "vue-router";
export default {
  name: 'person',
  data() {
    return {
    }
  },
  setup() {

    const state = reactive({
      select: false,
      logoUrl,
    })

    const toSchedule = () => {
      router.push({name:"schedule"})
    }

    const quit = () => {
      state.select = ! state.select
    }

    const router = useRouter();
    const onClickLeft = () => {
      router.back()
    }

    
    return {
      state,
      toSchedule,
      quit,
      onClickLeft
    }
  }
}
</script>

<style scoped>
.person {
  padding-left: .52rem;
  width: 100%;
  height: 100%;
}

.header {
  margin-top: 1.10rem;
  margin-bottom: .40rem;
  display: flex;
  align-items: center;
  color: #333;
  font-size: .40rem;
  font-weight: 700;
}

.avatar {
  width: 1.00rem;
  height: 1.00rem;
  border-radius: 100%;
  overflow: hidden;
  margin-right: .26rem;
}

.item {
  padding: .50rem 0;
  border-bottom: .5px solid #ebebeb;
  color: #333;
  font-size: .30rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-arrow {
  width: .12rem;
  height: .20rem;
  margin-right: .60rem;
}

.item:last-child {
  border: 0
}

.person-img {
  width: .48rem;
  height: .48rem;
  margin-right: .22rem;
  vertical-align: middle;
}
</style>