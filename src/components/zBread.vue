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
        this.changeName = content;
      });
    },
    created() {
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb () {
        var breadNumber= typeof(this.$route.meta.breadNumber)!="undefined"?this.$route.meta.breadNumber:1;//默认为1
        var newBread={name:this.$route.name,path:this.$route.fullPath};//当前页面的
        var breadList=this.$store.getters.breadListState;//获取breadList数组
        breadList.splice(breadNumber,breadList.length-breadNumber,newBread);
        var breadList=JSON.stringify(breadList);
        //this.$store.commit('breadListMutations',breadList);
        this.breadList=this.$store.getters.breadListState;
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
