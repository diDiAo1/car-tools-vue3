import axios from 'axios';
import qs from 'qs';
// import { Message, Loading } from 'element-ui';
// import $router from '@/app/router';
// import domMessage from './messageOnce'
// import $store from '@/app/store';
// const messageOnce = new domMessage()
// axios.defaults.withCredentials = true;

let _Loading = null;
let codes = [100500];

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const ajax = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: 20000
});
ajax.defaults.paramsSerializer = function(params) {
  return qs.stringify(params);
};
const createApi = (options = {}) => {
  // if (options.loading) {
  //   if (!_Loading) {
  //     _Loading = Loading.service(
  //       Object.assign({}, {target:'#app'}, { background: 'rgba(0,0,0,0)' }, { ...options.loading })
  //     );
  //   }
  // }
  return ajax(options);
};

ajax.interceptors.request.use(config => {
  config.headers['x-requested-with'] = 'XMLHttpRequest';

  if (config.method == 'post') {
    config.data = qs.stringify(config.data);
  }
  
  
  return config;
});

ajax.interceptors.response.use(response => {
  // _Loading && _Loading.close();
  if (_Loading) {
    _Loading.close();
    _Loading = null;
  }

  const res = response.data;

  // 登录逻辑
  if (res.code === '101402') {
    
    // let history = $store.state['mainTabs'].editableTabs || [];
    // let last = history[history.length - 1];
    // let ru = last ? (last.name == 'login' ? '/' : last.link) : '/';

    // messageOnce.error({
    //   message: 'session已过期，请重新登录！',
    //   duration: 2000,
    //   // onClose: toLogin,
    //   type: 'error'
    // });
    // $router.push({
    //   path: '/login',
    //   query: { ru }
    // });
    return false;
  }

  if (codes.indexOf(res.code) != -1) {
    // Message({
    //   message: res.message,
    //   type: 'error'
    // });

    return res;
  }

  if (res.code !== '100200') {
    // Message({
    //   message: res.message,
    //   type: 'error'
    // });

    throw {
      data: res,
      message: res.message
    };
  }

  return res.data;
},error => {
  if (_Loading) {
    _Loading.close();
    _Loading = null;
  }
  // Message({
  //   message: error,
  //   type: 'error'
  // });
  throw {
    message: error
  };
});

// const  toLogin = ()=> {
//   // $router.push({
//   //   path: '/login'
//   // });
//   if (localStorage.getItem('$logoutUrl')) {
//     $router.replace({
//       path: localStorage.getItem('$logoutUrl')
//     });
//   } else {
//     $router.replace({
//       path: '/login'
//     });
//     // window.location.href = '/login';
//   }
// }


export default createApi;
