const state = {
  deviceKey: 0,
};

// getters
const getters = {

};

// actions
const actions = {
  incrementKey({ commit },str){
    commit('changeKey',str)
  },
};

// mutations
const mutations = {
  changeKey(state,str){
    state.deviceKey=str;
    sessionStorage.setItem('deviceKey',str)
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
