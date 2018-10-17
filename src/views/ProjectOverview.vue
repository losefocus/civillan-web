<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header height="70px" style="border-bottom: 1px solid rgba(230,234,238,1);">
        <z-header ></z-header>
      </el-header>
      <el-container style="height: calc(100% - 70px);">
        <z-nav style="float: left;height: calc(100%)"></z-nav>
        <div class="z-main" style="height: 100%;">
          <div v-show="isActive" class="breadcrumb-box">
            <div :class="{'b-title':isActive}">{{ title }}</div>
            <div class="el-breadcrumb">
              <z-bread></z-bread>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import zHeader from '@/components/zHeader'
  import zNav from '@/components/zNav'
  import zBread from '@/components/zBread'
  export default {
    name: "ProjectOverview",
    components:{
      zHeader,
      zNav,
      zBread
    },
    data(){
      return{
        title:'',
        isActive:true,
      }
    },
    created(){

    },
    mounted(){
      this.title=this.$route.name;
      if(this.$route.path=='/project'){
        this.isActive=false;
      }else {
        this.isActive=true;
      }
    },
    methods:{
      change(msg){
      }
    },
    watch:{
      $route(to,from){
        if(to.path=='/project'){
          this.isActive=false;
        }else {
          this.isActive=true;
        }
        this.title=this.$route.name;
      }
    }
  }
</script>
<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .el-header{
    padding: 15px 40px;
  }
  .el-aside{
    height: 100%;
  }


  .breadcrumb-box{
    width: calc(100% - 40px);
    padding:20px 20px 0;
    height: 25px;
    background: #f5f5f9;
    text-align: right;
    .el-breadcrumb{
      float: right;
      //margin-right: 1%;
    }
    .b-title{
      float: left;
      width: 115px;
      height: 26px;
      line-height: 28px;
      font-size: 22px;
      font-weight: bold;
      border-left: 4px solid #F31A1A;
    }

  }
  .z-main{
    background: #f5f5f9;
    float: left;
    //padding: 20px;
    width: calc(100% - 245px);
    overflow: auto;
  }
  .z-main::-webkit-scrollbar {/*滚动条整体样式*/
    width:4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
    background: #ffffff;
  }
  .nav-bar::-webkit-scrollbar-button{
    background: rgba(0,0,0,0.2);
  }
  .z-main::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .z-main::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  @media screen and (max-width: 1467px){
    .z-main{
      background: #f5f5f9;
      width: calc(100% - 90px);
    }
  }
</style>
