import createApi from '@/utils/createApi';

export default {
   // 城市city管理列表列表
   cityServiceManageList: data => {
    return createApi({
      loading: {},
      url: '/city/service/manage/list',
      method: 'post',
      data
    })
  },

  login: ({ account, password } = {}) =>
    createApi({
      url: '/login/accountVerify',
      method: 'post',
      data: { account, password }
    }),
}