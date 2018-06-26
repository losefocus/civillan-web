function getCookie(c_name)
{
  if (document.cookie.length>0)
  {
    let c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
      let c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
}

const state = {
  isLogin:sessionStorage.getItem('isLogin') || 0,
  token:getCookie('token')||'',
};

// getters
const getters = {
  getlogined:state => {
    return state.isLogin
  },
};

// actions
const actions = {
  incrementLogin({ commit },num){
    commit('changeLogin',num)
  },
  incrementToken({ commit },str){
    commit('changeToken',str)
  }
};

// mutations
const mutations = {
  changeLogin(state,num){
    state.isLogin=num;
    sessionStorage.setItem('isLogin',num)
  },
  changeToken(state,str){
    state.token=str;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}