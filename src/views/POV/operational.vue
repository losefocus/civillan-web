<template>
  <div class="n-box">
    <ul class="a-box">
      <router-link  v-for="(list,index) in navList" :to="{path:list.path}" tag="li" :key="index">
        {{list.name}}
      </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "operational",
    data(){
      return{
        navList:[
          {
            path:'/operational/oOperational',
            name:'单日成效'
          },
          {
            path:'/operational/oAccumulative',
            name:'累计成效',
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .n-box{
    padding: 20px;
    //height: calc(100% - 100px);
    background: #f5f5f9;
    position: relative;
  }
  .a-box{
    //margin-top: 15px;
    position: absolute;
    width: auto;
    top: 35px;
    right: 40px;
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
    }
    li:first-child{
      border-radius: 5px 0 0 5px;
      border-right: none;
    }
    li:last-child{
      border-radius: 0 5px 5px 0;
      border-left: none;
    }
    .router-link-active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
  }
</style>
