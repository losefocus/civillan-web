<template>
  <div style="position: relative;height: calc(100% - 60px);" >
    <ul class="a-box">
        <router-link :to="{path:list.path}" tag="li" v-for="(list,index) in navList" :key="index">
          {{list.name}}
        </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import deviceList from '@/views/Project/deviceList'
  import deviceMap from '@/views/Project/deviceMap'
  import Bus from '@/common/eventBus'
  export default {
    name: "project_old",
    components: {
      deviceList,
      deviceMap
    },
    data () {
      return {
        navList:[
          {
            path:'/device/deviceMap',
            name:'设备地图'
          },
          {
            path:'/device/deviceList',
            name:'设备列表',
          },
        ]
      };
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .a-box{
    position: absolute;
    z-index: 99;
    top: 15px;
    right: 0;
    width: 214px;
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
