<template>
<div>
  <ul class="t-header">
    <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
  </ul>
  <div class="clear"></div>
  <a-analysis :isShow="isShow" :is="currentView" keep-alive  :data="currentView" :newStyle="newStyle"></a-analysis>
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
      newStyle:{
        padding:0
      },
      currentView:'aAnalysis',
      tIndex:0,
      isShow:true //是否打开弹窗
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
  .clear{
    clear: both;
  }
  .t-header{
    width: 100%;
    height: 30px;
    margin-bottom: 20px;
    li{
      cursor: pointer;
      float: left;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #FFFFFF;
      color: #cccccc;
      border:1px solid #cccccc;
      margin-left: -1px;
    }
    li:first-child{
      border-radius: 5px 0 0 5px;
    }
    li:last-child{
      border-radius: 0 5px 5px 0;
    }
    .active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
    .active+li{
      border-left: none;
    }
  }
</style>
