// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/swiper/css/swiper.min.css'
// import '../src/assets/css/reset.css'
import '../src/assets/js/flexible'
//引入 axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 引入qs模块
import qs from 'qs'
Vue.prototype.$qs = qs
// 引入vant样式的
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.config.productionTip = false
Vue.use(Vant)

 //引入过滤器
import filter from './filter/time'
//  console.log(filter,'filter')
//创建全局过滤器
Vue.filter('toTime',filter) 





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
