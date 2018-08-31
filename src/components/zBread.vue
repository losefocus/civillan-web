<template>
  <div class="m-artHeader">
    <el-breadcrumb class="linkWay">
      <el-breadcrumb-item  v-for="(item,index) in breadList" :key="index"  separator="/" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  import Bus from '@/common/eventBus'
  export default{
    data() {
      return {
        isShow:true,
        title:'',
        name:'',
        changeName:"",
        breadList: [] // 路由集合
      }
    },
    mounted(){
      Bus.$on('Title', content => {
        //console.log(content);
        this.changeName = content;
        //sessionStorage.setItem('pGrouping',content)
      });
    },
    created() {
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb () {
        this.breadList = [].concat(this.$route.matched);
        console.log(this.breadList);
        this.$route.matched.forEach((item, index) => {
          item.name === '在线一览' ? item.path = '/' : this.$route.path === item.path ? this.title = item.name : '';
        })
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
