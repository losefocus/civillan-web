<template>
  <div class="v-box">
    <ul class="a-box">
      <router-link :to="{path:list.path}" tag="li" v-for="(list,index) in navList" :key="index">
        {{list.name}}
      </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        navList:[
          {
            path:'/video/pData',
            name:'图片资料'
          },{
            path:'/video/vData',
            name:'影像资料'
          },
          {
            path:'/video/zPanorama',
            name:'全景图片',
          },
          {
            path:'/video/vSurveillance',
            name:'视频监控',
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-box{
    width: calc(100% - 40px);
    height: calc(100% - 142px);
    padding: 20px
  }
  .a-box{
    //margin: 15px 0 15px 0;
    margin-bottom: 10px;
    width: 100%;
    height: 32px;
    li{
      font-size: 14px;
      cursor: pointer;
      float: left;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background: #FFFFFF;
      color: #999999;
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
