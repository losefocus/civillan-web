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
      //console.log(this.$route.path.split('/')[1]);
      this.getBreadcrumb();
      //let pGrouping=sessionStorage.getItem('pGrouping');
      /*if(!this.changeName){
        this.name='';
        this.getBreadcrumb()
      }else {
        this.name=this.changeName;
        this.getBreadcrumb();
        this.changeName=""
      } //刷新的参数为true*/
    },
    methods: {
      getBreadcrumb () {
        this.breadList = [].concat(this.$route.matched);
        //console.log(this.breadList);
        this.$route.matched.forEach((item, index) => {
          /*if(index==1){
            console.log('asdasd'+item.name);
            item.name=this.name
          }*/
          /*if(item.name==''){
            this.breadList.splice(0,3);
          }*/
          // 判断父级路由是否为空字符串或者meta是否为首页,直接复写路径到根目录
          // 后面的就是判断路由和当前遍历的项目是否一致,是的话把标题的值给上
          item.name === '在线一览' ? item.path = '/' : this.$route.path === item.path ? this.title = item.name : '';
        })
        /*if(!this.name){
          this.breadList = [].concat(this.$route.matched);
          this.$route.matched.forEach((item) => {
            if(item.name==''){
              this.breadList.splice(0,3);
            }
            // 判断父级路由是否为空字符串或者meta是否为首页,直接复写路径到根目录
            // 后面的就是判断路由和当前遍历的项目是否一致,是的话把标题的值给上
            item.name === '在线一览' ? item.path = '/' : this.$route.path === item.path ? this.title = item.name : '';
          })
        }else {

        }*/
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb()
        /*if(!this.changeName){
          this.name='';
          this.getBreadcrumb()
        }else {
          this.name=this.changeName;
          this.getBreadcrumb();
          this.changeName=""
        }*/
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
