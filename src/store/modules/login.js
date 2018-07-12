
const state = {
  token:sessionStorage.getItem('token') || 0,
};

// getters
const getters = {
  getlogined:state => {
    return state.token
  },
};

// actions
const actions = {
  incrementToken({ commit },str){
    commit('changeToken',str)
  }
};

// mutations
const mutations = {
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
