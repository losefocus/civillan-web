<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header height="70px" style="border-bottom: 1px solid rgba(230,234,238,1);">
        <z-header></z-header>
      </el-header>
      <el-container style="height: 100%">
        <z-nav></z-nav>
        <el-main>
          <div class="breadcrumb-box" v-show="isActive">
            <div :class="{'b-title':isActive}">{{ title }}</div>
            <div class="el-breadcrumb">
              <z-bread></z-bread>
            </div>
          </div>
          <transition name="fade" mode="out-in">
              <router-view></router-view>
          </transition>
        </el-main>
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
    mounted(){
      this.title=this.$route.name;
      if(!this.$route.name){
        this.title='';
        this.isActive=false;
      }else {
        this.isActive=true;
      }
    },
    methods:{
      change(msg){
        console.log(msg)
      }
    },
    watch:{
      $route(){
        this.title=this.$route.name;
        if(!this.$route.name){
          this.title='';
          this.isActive=false;
        }else {
          this.isActive=true;
        }
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
    width: 100%;
    height: 45px;
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
  .el-main{
    height: 100%;
    background: #f5f5f9;
  }
</style>
