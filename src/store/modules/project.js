const state = {
  projectId: sessionStorage.getItem('projectId') || 0,
  tenant:sessionStorage.getItem('tenant') || 0,
  projectLogo:sessionStorage.getItem('projectId') || 0
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
  },
  incrementLogo({ commit },str){
    commit('changeLogo',str)
  }
};

// mutations
const mutations = {
  changeId(state,str){
    state.projectId=str;
    sessionStorage.setItem('projectId',str)
  },
  changeTenant(state,str){
    state.tenant=str;
    sessionStorage.setItem('tenant',str)
  },
  changeLogo(state,str){
    state.projectLogo=str;
    sessionStorage.setItem('projectLogo',str)
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
