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
        breadList: '',// 路由集合
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
        let breadNumber= this.$route.query.breadNum || 1;//url变量breadNum记录层级，默认为1，如果大于1，要添加上变量；
        let breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
        let curName=this.$route.name;
        let curPath=this.$route.fullPath;
        let newBread={name:curName,path:curPath};
        let ishome=curName=='首页';
        console.log(ishome);
        if(breadNumber===1){//点击一级菜单
          this.$store.commit('breadListStateRemove',1);//初始化，只有首页面包屑按钮
          if(!ishome)//如果不是首页
            this.$store.commit('breadListStateAdd',newBread);//当前页面添加到breadlist集合
        }
        else if(breadLength<=breadNumber){//如果不是一级导航，并且breadlist集合个数等于或者小于目前层级
          this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadlist集合
        }else{
          this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
        }
        this.breadlist=this.$store.state.breadListState;
        console.log(this.breadlist);
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
