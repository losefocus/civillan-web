<template>
  <div class="m-artHeader">
    <el-breadcrumb class="linkWay">
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="index"  separator="/" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default{
    created() {
      this.getBreadcrumb();//刷新的参数为true
    },
    data() {
      return {
        title:'',
        breadList: [] // 路由集合
      }
    },
    methods: {
      getBreadcrumb () {
        this.breadList = [].concat(this.$route.matched);
        this.$route.matched.forEach((item, index) => {
           if(item.name==''){
             this.breadList.splice(0,3);
           }
          // 判断父级路由是否为空字符串或者meta是否为首页,直接复写路径到根目录
          // 后面的就是判断路由和当前遍历的项目是否一致,是的话把标题的值给上
          item.name === '在线一览' ? item.path = '/' : this.$route.path === item.path ? this.title = item.name : '';
        })
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb();
      }
    },
  }
</script>
