const state = {
  breadListState:[
    {name:'在线一览',path:'/'}
  ]
};

// mutations
const mutations = {
  breadListMutations(getters,list){
    getters.breadListState=list;
    sessionStorage.setItem('breadListStorage',list);
  }
};

const getters={
  breadListState(){
    return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
  }
};

export default {
  state,
  getters,
  mutations
}
