<template>
  <div>
    <el-container style="height: 100%">
      <el-header height="70px">
        <z-header></z-header>
      </el-header>
      <el-container>
        <el-aside width="245px">
          <z-nav></z-nav>
        </el-aside>
        <el-main>
          <div class="breadcrumb-box">
            <div class="b-title">{{ title }}</div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">在线一览</el-breadcrumb-item>
              <el-breadcrumb-item @changeTitle="change" >{{ title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <transition name="move" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import zHeader from '@/components/zHeader'
  import zNav from '@/components/zNav'
  import Bus from '@/assets/eventBus'
  export default {
    name: "ProjectOverview",
    components:{
      zHeader,
      zNav
    },
    data(){
      return{
        title:''
      }
    },
    created(){
      this.title=this.$route.meta.title;
      //console.log(this.title)
    },
    mounted(){
      var that=this
      Bus.$on('changeTitle',function (msg) {
        that.title=msg
      })
    },
    methods:{
      change(msg){
        console.log(msg)
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-header{
    padding: 15px 40px;
  }
  .breadcrumb-box{
    width: 100%;
    height: 80px;
    text-align: right;
    .el-breadcrumb{
      width: 165px;
      float: right;
    }
    .b-title{
      float: left;
      width: 100px;
      height: 26px;
      font-weight: bold;
      border-left: 4px solid #F31A1A;
    }
  }
  .el-main{
    background: #f5f5f9;
  }
</style>
