
<template>
  <div style="position: relative;height: calc(100% - 60px);" >
    <!--<transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>-->
    <ul class="a-box">
      <li v-for="(list,index) in navList" :key="index" :class="{active:index==isActive}">
        <router-link :to="{path:list.path}" tag="li">
          {{list.name}}
        </router-link>
      </li>
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
            path:'/project/deviceList',
            name:'设备列表',
          },
          {
            path:'/project/deviceMap',
            name:'设备地图'
          }
        ],
        isActive:0,
      };
    },
    methods: {
      changeTab(list,index){
        this.$router.push(list.path);
        console.log(index);
        this.isActive=index;
      }
    },
    created(){
    },
    mounted(){
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
    top: 30px;
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
    /*li:first-child{
      border-radius: 5px 0 0 5px;
    }
    li:last-child{
      border-radius: 0 5px 5px 0;
    }*/
   /* .active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }*/
    .router-link-active{
      background: #F76A6A;
      color: #ffffff;
      border:1px solid #F76A6A;
    }
  }
</style>
