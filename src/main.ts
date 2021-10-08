import { createApp } from 'vue'
import { store, key } from './store'
// import ElementPlus from 'element-plus';
import router from "./router";
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
// import 'element-plus/dist/index.css'
// import './index.css'

const app = createApp(App)

// app.use(ElementPlus)
app.use(Vant)
app.use(store, key)
app.use(router)
app.mount('#app')
