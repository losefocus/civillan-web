<template>
  <div style="position: relative">
    <!--<transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>-->
    <ul class="a-box">
      <li v-for="(list,index) in navList" :key="index" @click="changeTab(list,index)" :class="{active:index==isActive}">
        {{list.name}}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import deviceList from '@/views/Project/deviceList'
  import deviceMap from '@/views/Project/deviceMap'
  export default {
    name: "project",
    components: {
      deviceList,
      deviceMap
    },
    data () {
      return {
        navList:[
          {
            path:'/project/deviceMap',
            name:'设备列表'
          },
          {
            path:'/project/deviceList',
            name:'实时报警',
          }
        ],
        isActive:'',
      };
    },
    methods: {
      changeTab(list,index){
        this.$router.push(list.path);
        this.isActive=index;
      }
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
