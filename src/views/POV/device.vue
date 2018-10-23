<template>
    <div style="position: relative;height: calc(100% - 75px);" >
    <ul class="a-box">
        <router-link :to="{path:list.path}" tag="li" v-for="(list,index) in navList" :key="index">
          {{list.name}}
        </router-link>
    </ul>
    <router-view :searchStyle="searchStyle" :typeStyle="typeStyle"></router-view>
  </div>
</template>

<script>
  import deviceList from '@/views/Project/deviceList'
  import deviceMap from '@/views/Project/deviceMap'
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
        ],
        searchStyle: { //搜索框的位置
          top: '0',
          left: '180px',
        },
        typeStyle: { //类型过滤的位置
          top: '0',
          left: '0',
        },
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
      margin-left: -1px;
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
