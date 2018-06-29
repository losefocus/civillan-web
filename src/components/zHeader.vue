<template>
<div style="height:100%;">
  <div class="hd-logo hd-left"></div>
  <div class="hd-name hd-left">工程施工实时监控系统</div>

  <img src="@/assets/header/label_close.png" class="hd-right hd-close">
  <div class="hd-uName hd-right">
    <el-dropdown trigger="click" placement="bottom">
      <span class="el-dropdown-link">
        <div class="u-name">用户名</div><i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>个人中心</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <img src="@/assets/header/userImg.png" class="hd-right hd-portrait">
  <router-link to="/" class="p-box hd-right">
    <i class="iconfont icon-MapView"></i>
    <span class="p-name">项目总览</span>
  </router-link>

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
  .el-header{
    padding-bottom: 0;
  }
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
    margin-top: 7px;
    width: 32px;
    height: 32px;
  }
  .hd-uName{
    margin: 10px 0 0 10px;
  }
  .hd-close{
    margin: 13px 10px 0 40px;
  }
  .p-box{
    text-decoration: none;
    height: 40px;
    line-height: 44px;
    margin-right: 50px;
    .icon-MapView{
      margin-top: 30px;
      font-size: 25px;
      color: #4F5059;
      vertical-align: middle;
    }
    .p-name{
      font-size:12px;
      color:rgba(58,59,68,1);
      vertical-align: middle;
    }
  }

  .u-name{
    height: 27px;
    padding-top: 5px;
    display: inline-block;
    cursor: pointer;
    font-size: 12px;
  }
</style>
