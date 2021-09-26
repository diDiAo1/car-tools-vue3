<template>
  <el-button type="text" @click="login">登录</el-button>
  <el-button type="text" @click="getCityList">加载list</el-button>
  <el-table :data="state.tableData" style="width: 100%">
      <el-table-column prop="cityName" min-width="82" label="开通城市"></el-table-column>
      <el-table-column prop="channelName" min-width="82" label="渠道"></el-table-column>
      <el-table-column prop="carScene" min-width="82" label="用车场景"></el-table-column>
      <el-table-column prop="serviceType" min-width="82" label="开通业务"></el-table-column>
      <el-table-column prop="carLevel" min-width="82" label="开通车型"></el-table-column>
      <el-table-column prop="status" min-width="82" label="生效状态"></el-table-column>
      <el-table-column label="操作" width="90">
        <template #default="scope">
          <div class="icon">
              <el-button @click.stop="del(scope.row)" type="text" icon="icon-car-shanchu">删除</el-button>
              <el-button @click.stop="edit(scope.row)" type="text" icon="icon-car-bianji">修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
</template>


<script lang="ts">
import { defineComponent, reactive } from 'vue'
import API from '../service/index.js';
import { CityData } from '@/types/index'

export default defineComponent({
  name: 'City',
  data() {
    return {
      msg: 'about....'
    }
  },
  setup() {

    const state = reactive({
      tableData: [] as Array<any>,
      tableDataCount: 0
    })
    // 
    const getCityList = async (): Promise<void> => {
      const data: CityData = await API.cityServiceManageList({});
      state.tableData = data.records;
      state.tableDataCount = data.total;

    } 

    const login = () => {
      API.login({account:'13072139495',password:'123456'}).then(res => {
        console.log(res)
      })
    }
    
    return {
      state,
      getCityList,
      login
    }
  }
})
</script>