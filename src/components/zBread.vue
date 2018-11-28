<template>
  <div class="m-artHeader">
    <el-breadcrumb class="linkWay">
      <el-breadcrumb-item  v-for="(item,index) in breadList" :key="item.path"  separator="/" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  import Bus from '@/common/eventBus'
  export default{
    data() {
      return {
        isShow:true,
        name:'',
        breadList: [] // 路由集合
      }
    },
    mounted(){
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => item.name);
        matched.splice(1,0,{name:sessionStorage.getItem('groupName'),path:'/project'});
        this.breadList = matched;
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    },
  }
</script>
<style>
  .el-breadcrumb__inner.is-link{
    color: #999999;
    font-weight: 100;
  }
</style>
