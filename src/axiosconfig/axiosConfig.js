import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { Message, Loading } from 'element-ui'
// 响应时间
//var root = process.env.API_ROOT;
//console.log(process.env.API_ROOT);
axios.defaults.timeout = 3000;
// 配置cookie
 //axios.defaults.withCredentials = true;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 静态资源
Vue.prototype.$static = '';

// 配置接口地址
//axios.defaults.baseURL = root;
var loadingInstance;
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    /*if(config.url=='/foreground/realtime/data'){
      loadingInstance=Loading.service({
        lock: false,
        fullscreen:false,
        //text: '数据加载中，请稍后...',
        //spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      })
    }else {
      loadingInstance = Loading.service({
        lock: true,
        //text: '数据加载中，请稍后...',
        //spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      });
    }*/

    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    //console.log(qs.stringify(config.data));
    config.headers.token = sessionStorage.getItem("token");
    return config
  },
  err => {
    //loadingInstance.close();
    Message.error('请求错误');
    return Promise.reject(err)
  }
);
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      //loadingInstance.close();
      return res;
    }
  },
  err => {
    //loadingInstance.close();
    console.log(err.request.status);
    switch(err.request.status){
      case 401:
        Message.error('您的账号暂未授权');
        router.replace({
          path: 'login',
          //query: {redirect: router.currentRoute.fullPath}
        });
        break;
      case 500:
        Message.error('服务器繁忙，请稍后访问');
        break;
    }
    /*if(err.request&&err.request.status===401){
      console.log('401');
      Message.error('未授权');
      //router.push({ path: 'login' })
      router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
      })
    }else {
      console.log('身份验证失败')
    }*/
    //Message.error('请求失败，请稍后再试');
    return Promise.reject(err)
  }
);
// 发送请求
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
