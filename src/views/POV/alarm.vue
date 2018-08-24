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
  .a-box{
    width: 100%;
    height: 60px;
    li{
      font-size: 14px;
      cursor: pointer;
      float: left;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 32px;
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
    .router-link-active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
  }

</style>
