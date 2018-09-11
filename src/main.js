// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import 'es6-promise/auto'
import 'babel-polyfill'
import '../static/common/reset.css'

Vue.config.productionTip = false;

import api from './api/'
Vue.prototype.$api = api;

import axios from 'axios'
Vue.prototype.$http= axios;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import ECharts from 'vue-echarts/components/ECharts.vue'

import * as filters from './filters' // 全局filter

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

// 注册组件后即可使用
Vue.component('chart', ECharts);

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  echarts,
  components: { App },
  template: '<App/>'
});
