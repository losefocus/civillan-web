//当前文件需要在main.js中引用
import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex);

var store= new Vuex.Store({
  state:{
    isLogin:sessionStorage.getItem('isLogin') || 0,
    token:sessionStorage.getItem('isLogin') || ''
  },
  getters:{
    getlogined:state => {
      return state.isLogin
    },
  },
  mutations:{
    changeLogin(state,num){
      state.isLogin=num;
      sessionStorage.setItem('isLogin',num)
    },
    changeToken(state,str){
      state.token=str
      sessionStorage.setItem('token',str)
    }
  },
  actions:{
    incrementLogin({ commit },num){
      commit('changeLogin',num)
    },
    incrementToken({ commit },str){
      commit('changeToken',str)
    }
  }
});

export default store
