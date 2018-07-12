const state = {
  projectId: 0,
  tenant:0,
};

// getters
const getters = {

};

// actions
const actions = {
  incrementId({ commit },str){
    commit('changeId',str)
  },
  incrementTenant({ commit },str){
    commit('changeTenant',str)
  }
};

// mutations
const mutations = {
  changeId(state,str){
    state.token=str;
  },
  changeTenant(state,str){
    state.token=str;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
