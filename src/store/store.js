import login from './modules/login'
import breadcrumb from './modules/breadcrumb'
import project from './modules/project'

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    breadcrumb,
    project
  },
  strict: debug
})
