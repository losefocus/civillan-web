import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import breadcrumb from './modules/breadcrumb'
import project from './modules/project'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    breadcrumb,
    project
  },
  strict: debug
})
