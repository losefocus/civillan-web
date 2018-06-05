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

Vue.use(Router)

const vRouter = new Router({
  routes: [
    {
      path: '/',
      name: 'ProjectEntrance',
      component: ProjectEntrance,
      meta: {requireAuth: true},
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/ProjectOverview',
      name: 'ProjectOverview',
      redirect:"/project",
      component: ProjectOverview,
      meta: {requireAuth: true},
      children:[
        {
          path: '/project',
          component: project,
          meta: { title: '项目总览' }
        },
        {
          path: '/analysis',
          component: analysis,
          meta: { title: '统计分析' }
        },
        {
          path: '/historical',
          component: historical,
          meta: { title: '历史数据' }
        },{
          path: '/alarm',
          component: alarm,
          meta: { title: '报警查询' }
        },{
          path: '/document',
          component: document,
          meta: { title: '文档资料' }
        },{
          path: '/operational',
          component: operational,
          meta: { title: '作业成效' }
        },{
          path: '/quality',
          component: quality,
          meta: { title: '质量评估' }
        },{
          path: '/video',
          component: video,
          meta: { title: '视频监控' }
        }
      ]
    }
  ]
})

/*vRouter.beforeEach(function (to,from,next) {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (store.state.token) {  //token存在 已经登陆
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});*/
export default vRouter
