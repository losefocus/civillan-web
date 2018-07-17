import Vue from 'vue'
import store from '@/store/store'

import Router from 'vue-router'
import ProjectEntrance from '@/views/ProjectEntrance'
import login from '@/views/login'
import ProjectOverview from '@/views/ProjectOverview'
import alarm from '@/views/POV/alarm'
import analysis from '@/views/POV/analysis'
import document from '@/views/POV/document'
import historical from '@/views/POV/historical'
import operational from '@/views/POV/operational'
import quality from '@/views/POV/quality'
import video from '@/views/POV/video'
import project from '@/views/POV/project'
import softBase from '@/views/Project/softBase'
import classification from '@/views/Project/classification'

import aAnalysis from '@/views/alarm/aAnalysis'
import aHistory from '@/views/alarm/aHistory'
import aRealTime from '@/views/alarm/aRealTime'

Vue.use(Router)

const vRouter = new Router({
  routes: [
    {
      path: '/',
      name: '在线一览',
      component: ProjectEntrance,
      meta: {requireAuth: true},
    },
    {
      path: '/login',
      name: '登录',
      component: login
    },
    {
      path: '/ProjectOverview',
      name: '项目总览',
      redirect:"/project",
      component: ProjectOverview,
      meta: {requireAuth: true},
      children:[
        {
          path: '/project',
          name:'项目名称',
          component: project,
          redirect:"/project/classification",
          meta: { requireAuth: true},
          children:[
            {
              path:'/project/classification',
              name:'',
              component:classification,
              meta: { requireAuth: true}
            },
            {
              path:'/project/softBase',
              component:softBase,
              name:'设备列表',
              meta:{requireAuth: true}
            }
          ]
        },
        {
          path: '/analysis',
          component: analysis,
          name:'统计分析',
          meta: { requireAuth: true }
        },
        {
          path: '/historical',
          component: historical,
          name:'历史数据',
          meta: { requireAuth: true }
        },{
          path: '/alarm',
          component: alarm,
          name:'报警查询',
          redirect:'/alarm/aAnalysis',
          meta: { requireAuth: true },
          children:[
            {
              path:'/alarm/aAnalysis',
              name:'报警分析',
              component:aAnalysis,
              meta: {requireAuth: true}
            },
            {
              path:'/alarm/aRealTime',
              component:aRealTime,
              name:'实时报警',
              meta:{requireAuth: true}
            },
            {
              path:'/alarm/aHistory',
              component:aHistory,
              name:'历史报警',
              meta:{requireAuth: true}
            }
          ]
        },{
          path: '/document',
          component: document,
          name:'文档资料',
          meta: { requireAuth: true }
        },{
          path: '/operational',
          component: operational,
          name:'作业成效',
          meta: { requireAuth: true }
        },{
          path: '/quality',
          component: quality,
          name:'质量评估',
          meta: { requireAuth: true }
        },{
          path: '/video',
          component: video,
          name:'视频监控',
          meta: { requireAuth: true }
        }
      ]
    }
  ]
});


vRouter.beforeEach(function (to,from,next) {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if(window.$cookies.get('token')){
      sessionStorage.setItem('token',window.$cookies.get('token'));
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
