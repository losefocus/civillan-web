<template>
  <div>
    <ul class="a-box">
      <li v-for="(list,index) in navList" :key="index" @click="changeTab(list,index)" :class="{active:index==isActive}">
        {{list.name}}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isActive:sessionStorage.getItem('aActive') || 0,
        navList:[
          {
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
    },
    methods:{
      changeTab(list,index){
        this.$router.push(list.path);
        this.isActive=index;
      }
    },
    watch:{
      $route(){
        this.navList.forEach((item,i)=>{
          if(item.path==this.$route.path){
            //sessionStorage.setItem('aActive',i);
            this.isActive=i;
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .a-box{
    width: 100%;
    height: 60px;
    li{
      cursor: pointer;
      float: left;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
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
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
  }

</style>
