const state = {
  unreadInformation: 0,
};

// getters
const getters = {
  getlogined:state => {
    return state.unreadInformation
  },
};

// actions
const actions = {
  incrementUnread({ commit },str){
    commit('changeToken',str)
  }
};

// mutations
const mutations = {
  changeUnRead(state,str){
    state.unreadInformation+=1;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
