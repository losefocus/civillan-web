<template>
<div>
  <ul class="a-box">
    <router-link v-for="(list,index) in navList" :to="{path:list.path}" tag="li"  :key="index">
      {{list.name}}
    </router-link>
  </ul>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "AlarmQuery",
  data(){
    return{
      navList:[
        {
          path:'/alarm/aAnalysis',
          name:'报警分析'
        },
        {
          path:'/alarm/aRealTime',
          name:'实时报警',
        },
        {
          path:'/alarm/aHistory',
          name:'历史报警',
        }
      ]
    }
  },
}
</script>

<style scoped lang="scss">
  .n-box{
    padding: 20px;
    height: auto;
    background: #f5f5f9;

  }
  .a-box{
    margin-top: 15px;
    width: calc(100% - 40px);
    height: 40px;
    padding: 20px 20px 0;
    li{
      font-size: 14px;
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
    .router-link-active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
    .router-link-active+li{
      border-left: none;
    }
  }

</style>
