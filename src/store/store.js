import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import breadcrumb from './modules/breadcrumb'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    breadcrumb
  },
  strict: debug
})
