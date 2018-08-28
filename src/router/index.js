import Vue from 'vue'
import store from '@/store/store'

import Router from 'vue-router'

import ProjectEntrance from '@/views/ProjectEntrance'
import login from '@/views/login'
import ProjectOverview from '@/views/ProjectOverview'
import alarm from '@/views/POV/alarm'
import analysis from '@/views/POV/analysis'
import device from '@/views/POV/device'
import configure from '@/views/POV/configure'
import document from '@/views/POV/document'
import historical from '@/views/POV/historical'
import operational from '@/views/POV/operational'
import quality from '@/views/POV/quality'
import video from '@/views/POV/video'
import project from '@/views/POV/project'

import softBase from '@/views/Project/softBase'
import classification from '@/views/Project/classification'
import deviceList from '@/views/Project/deviceList'
import deviceMap from '@/views/Project/deviceMap'

import aAnalysis from '@/views/alarm/aAnalysis'
import aHistory from '@/views/alarm/aHistory'
import aRealTime from '@/views/alarm/aRealTime'


import oOperational from '@/views/operational/oOperational'
import oAccumulative from '@/views/operational/oAccumulative'

import vData from '@/views/video/vData'
import pData from '@/views/video/pData'
import vSurveillance from '@/views/video/vSurveillance'
import zPanorama from '@/views/video/zPanorama'

Vue.use(Router)

const vRouter = new Router({
  routes: [
    {
      path: '/',
      name: '在线一览',
      component: resolve => require(['@/views/ProjectEntrance'],resolve),
      meta: {requireAuth: true},
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['@/views/login'],resolve),
    },
    {
      path: '/ProjectOverview',
      name: '项目总览',
      redirect:"/project",
      component: resolve => require(['@/views/ProjectOverview'],resolve),
      meta: {requireAuth: true},
      children:[
        {
          path: '/project',
          name:'项目分组',
          component: resolve => require(['@/views/POV/project'],resolve),
          //redirect:"/project/deviceMap",
          meta: { requireAuth: true},
          children:[
            {
              path:'/project/classification',
              name:'',
              component:resolve => require(['@/views/Project/classification'],resolve),
              meta: { requireAuth: true}
            },
            {
              path:'/project/softBase',
              component:softBase,
              name:'设备',
              meta:{requireAuth: true}
            }
          ]
        },
        {
          path: '/device',
          component: resolve => require(['@/views/POV/device'],resolve),
          name:'设备信息',
          redirect:"/device/deviceList",
          meta: { requireAuth: true },
          children:[
            {
              path:'/device/deviceList',
              component:resolve => require(['@/views/Project/deviceList'],resolve),
              name:'设备列表',
              meta:{requireAuth: true}
            },
            {
              path:'/device/deviceMap',
              component:resolve => require(['@/views/Project/deviceMap'],resolve),
              name:'设备地图',
              meta:{requireAuth: true}
            }
          ]
        },{
          path: '/configure',
          component: resolve => require(['@/views/POV/configure'],resolve),
          name:'作业配置',
          meta: { requireAuth: true }
        },{
          path: '/analysis',
          component: resolve => require(['@/views/POV/analysis'],resolve),
          name:'统计分析',
          meta: { requireAuth: true }
        },
        {
          path: '/historical',
          component: resolve => require(['@/views/POV/historical'],resolve),
          name:'数据报表',
          meta: { requireAuth: true }
        },{
          path: '/alarm',
          component: resolve => require(['@/views/POV/alarm'],resolve),
          name:'故障报警',
          redirect:'/alarm/aAnalysis',
          meta: { requireAuth: true },
          children:[
            {
              path:'/alarm/aAnalysis',
              name:'报警分析',
              component:resolve => require(['@/views/alarm/aAnalysis'],resolve),
              meta: {requireAuth: true}
            },
            {
              path:'/alarm/aRealTime',
              component:resolve => require(['@/views/alarm/aRealTime'],resolve),
              name:'实时报警',
              meta:{requireAuth: true}
            },
            {
              path:'/alarm/aHistory',
              component:resolve => require(['@/views/alarm/aHistory'],resolve),
              name:'历史报警',
              meta:{requireAuth: true}
            }
          ]
        },{
          path: '/document',
          component: resolve => require(['@/views/POV/document'],resolve),
          name:'文档资料',
          meta: { requireAuth: true }
        },{
          path: '/operational',
          component: resolve => require(['@/views/POV/operational'],resolve),
          name:'作业成效',
          redirect:'/operational/oOperational',
          meta: { requireAuth: true },
          children:[
            {
              path:'/operational/oOperational',
              name:'单日成效',
              component:resolve => require(['@/views/operational/oOperational'],resolve),
              meta: {requireAuth: true}
            },
            {
              path:'/operational/oAccumulative',
              component:resolve => require(['@/views/operational/oAccumulative'],resolve),
              name:'累计成效',
              meta:{requireAuth: true}
            }
          ]
        },{
          path: '/quality',
          component: resolve => require(['@/views/POV/quality'],resolve),
          name:'质量评估',
          meta: { requireAuth: true }
        },{
          path: '/video',
          component: resolve => require(['@/views/POV/video'],resolve),
          name:'现场影像',
          meta: { requireAuth: true },
          redirect:'/video/pData',
          children:[
            {
              path:'/video/pData',
              name:'图片资料',
              component:resolve => require(['@/views/video/pData'],resolve),
              meta: {requireAuth: true}
            },{
              path:'/video/vData',
              name:'影像资料',
              component:resolve => require(['@/views/video/vData'],resolve),
              meta: {requireAuth: true}
            },
            {
              path:'/video/zPanorama',
              component: resolve => require(['@/views/video/zPanorama'],resolve),
              name:'全景图片',
              meta:{requireAuth: true}
            },
            {
              path:'/video/vSurveillance',
              component:  resolve => require(['@/views/video/vSurveillance'],resolve),
              name:'视频监控',
              meta:{requireAuth: true}
            }
          ]
        }
      ]
    }
  ]
});


vRouter.beforeEach(function (to,from,next) {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if(window.$cookies.get('token')){
      sessionStorage.setItem('token',window.$cookies.get('token'));
      sessionStorage.setItem('wsUrl',window.$cookies.get('wsUrl'));
      next();
    }else {
      if (store.state.login.token) { //token存在 已经登陆
        next();
      }
      else {
        next({
          path: '/login',
          query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
  }
  else {
    next();
  }
});
export default vRouter
