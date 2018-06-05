<template>
<div style="height:100%">
  <div class="hd-logo hd-left"></div>
  <div class="hd-name hd-left">工程施工实时监控系统</div>

  <img src="@/assets/header/label_close.png" class="hd-right hd-close">
  <div class="hd-uName hd-right">
    <el-dropdown>
      <span class="el-dropdown-link">
        我是DJ<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <img src="@/assets/header/b-Girl.jpg" class="hd-right hd-portrait">

</div>
</template>

<script>
  export default {
    name: "zHeader",
    data(){
       return{

       }
    }
  }
</script>

<style scoped lang="scss">
  .hd-left{
    float: left;
  }
  .hd-right{
    float: right;
  }
  .hd-logo{
    width: 155px;
    height: 100%;
    background: url("../../static/img/login/logo.png") no-repeat;
    background-size: 100% 100%;
  }
  .hd-name{
    width: 162px;
    height: 22px;
    padding-left: 20px;
    margin: 10px 0 0 20px;
    border-left: 2px solid #E6EAEE;
    color: #333333;
    font-size: 16px;
  }
  .hd-portrait{
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
  .hd-uName{
    margin: 10px 0 0 10px;
  }

  .hd-close{
    margin: 10px 10px 0 40px;
  }
</style>
