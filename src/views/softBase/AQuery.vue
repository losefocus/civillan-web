<template>
<div>
  <ul class="t-header">
    <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
  </ul>
  <r-state :is="currentView" keep-alive  :data="currentView"></r-state>
</div>
</template>

<script>
  import aAnalysis from '@/views/alarm/aAnalysis'
  import aHistory from '@/views/alarm/aHistory'
  import aRealTime from '@/views/alarm/aRealTime'

export default {
  name: "AQuery",
  components:{
    aAnalysis,
    aHistory,
    aRealTime
  },
  data(){
    return{
      tHeader:[
        {name:'报警分析'},
        {name:'实时报警'},
        {name:'历史报警'},
      ],
      tBody:[
        'aAnalysis',
        'aRealTime',
        'aHistory',
      ],
      currentView:'aAnalysis',
      tIndex:0
    }
  },
  methods:{
    changeTab(i){
      this.tIndex=i;
      this.currentView=this.tBody[i]
    }
  }
}
</script>

<style scoped lang="scss">
  .t-header{
    width: 100%;
    height: 60px;
    li{
      cursor: pointer;
      float: left;
      width: 120px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #FFFFFF;
      color: #CCCFD4;
      border:1px solid rgba(204,207,212,1);
    }
    li:first-child{
      border-radius: 5px 0 0 5px;
    }
    li:last-child{
      border-radius: 0 5px 5px 0;
    }
    .active{
      background: #6FDDE8;
      color: #ffffff;
      border:1px solid #6FDDE8;
    }
  }
</style>
