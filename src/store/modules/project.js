const state = {
  deviceKey: 0,
  historyKey: 0,
  changeTab:false,
  backTab:false,
};

// getters
const getters = {

};

// actions
const actions = {
  incrementKey({ commit },str){
    commit('changeKey',str)
  },
  incrementHistory({ commit },str){
    commit('changeHistory',str)
  },
  incrementTab({ commit },str){
    commit('changeTab',str)
  },
  incrementBack({ commit },str){
    commit('changeBack',str)
  },
};

// mutations
const mutations = {
  changeKey(state,str){
    state.deviceKey=str;
  },
  changeHistory(state,str){
    state.historyKey=str;
  },
  changeTab(state,str){
    state.changeTab=str;
  },
  changeBack(state,str){
    state.changeBack=str;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
