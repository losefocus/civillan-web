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
        <el-dropdown-item>用户中心</el-dropdown-item>
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item>消息通知</el-dropdown-item>
        <el-dropdown-item>帮助中心</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <img src="@/assets/header/userImg.png" class="hd-right hd-portrait">
  <div class="p-box hd-right" style="font-size: 28px;color: #E6EAEE;margin-right: 35px;vertical-align: middle;">|</div>
  <div @click="getMessage()" class="p-box hd-right" style="margin-right: 35px">
    <el-badge :value=num :max="99" class="item" :hidden='false'>
      <el-tooltip class="item" effect="dark" content="消息通知" placement="bottom">
        <i class="iconfont icon-message"></i>
      </el-tooltip>
    </el-badge>
  </div>
  <router-link to="/" class="p-box hd-right" style="margin-right: 40px">
    <el-tooltip class="item" effect="dark" content="项目地图" placement="bottom">
      <i class="iconfont icon-Rectanglex"></i>
    </el-tooltip>
    <!--<span class="p-name">项目地图</span>-->
  </router-link>

  <el-dialog
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    style="min-width: 1024px"
  >
    <ul class="t-header">
      <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
      <div @click="close()"></div>
    </ul>
    <n-message :is="currentView" keep-alive class="t-Body"></n-message>
  </el-dialog>

</div>
</template>

<script>
  import HCenter from '@/views/userCenter/HCenter.vue'
  import NMessage from '@/views/userCenter/NMessage.vue'
  import PSettings from '@/views/userCenter/PSettings.vue'
  import UCenter from '@/views/userCenter/UCenter.vue'
  export default {
    name: "zHeader",
    components:{
      HCenter,
      NMessage,
      PSettings,
      UCenter,
    },
    data(){
       return{
         dialogWidth:'68%',
         num:10,
         dialogVisible: false,
         tHeader:[
           {name:'用户中心'},
           {name:'个人设置'},
           {name:'消息通知'},
           {name:'帮助中心'},
         ],
         tBody:[
           'UCenter',
           'PSettings',
           'NMessage',
           'HCenter'
         ],
         tIndex:2,
         currentView:'NMessage'
       }
    },
    created(){
      /*let queueReceiveSetting = {//消息队列配置
        websock: null,
        client: null,
        wsuri: "ws://192.168.0.33:4050/ws/message/1fjldjfaaotriaohjdaldfjal"
      };

      if (queueReceiveSetting.websock) {
        queueReceiveSetting.websock.close();
      }
      queueReceiveSetting.websock = new WebSocket(queueReceiveSetting.wsuri);
      queueReceiveSetting.websock.onopen = function (res) {
        console.log("开启连接")
      };
      queueReceiveSetting.websock.onmessage = function (res) {
        console.log(res);
        let data = JSON.parse(res.data);
        console.log("收到数据：" + data.message);
        Message({
          message: data.message,
          type: 'info',
          showClose: true,
          duration: 3 * 1000
        })
      };
      queueReceiveSetting.websock.onclose = function (res) {
        console.log("连接关闭")
      };
      queueReceiveSetting.websock.onerror = function (res) {
        console.log("连接出错")
        // this.initWebSocket();
      };

      function Message(content) {
        console.log(content.message)
      }*/
    },
    methods:{
      getMessage(){
        this.dialogVisible=true
      },
      changeTab(i){
        this.tIndex=i;
        this.currentView=this.tBody[i]
      },
    }
  }
</script>
<style>
  .el-badge__content.is-fixed{
    top: 7px;
    right: 14px;
  }
  /*重置element*/
  .el-dialog__header{
    padding: 0 !important;
  }
  .el-dialog__headerbtn{
    top:11px;
    font-size: 21px;

  }
  .el-dialog__body{
    padding: 0 !important;
    height: 100%;
  }
  .is-fullscreen{
    background: #f5f5f9;
  }
</style>

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
    margin: 13px 10px 0 30px;
  }
  .p-box{
    text-decoration: none;
    height: 40px;
    line-height: 44px;

    .icon-Rectanglex{
      margin-top: 30px;
      font-size: 30px;
      color: #666666;
      vertical-align: middle;
    }
    .icon-message{
      margin-top: 30px;
      font-size: 30px;
      color: #666666;
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

  .t-header{
    height: 45px;
    background: #ffffff;
    li{
      cursor: pointer;
      float: left;
      width:160px;
      height:45px;
      text-align: center;
      line-height: 45px;
      font-size:14px;
      color:rgba(153,153,153,1);
    }
    .t-handle{
      float: right;
      width: 60px;
      height: 45px;
      line-height: 45px;
      margin-right: 20px;
      display: flex;
      justify-content: space-around;
      div{
        cursor: pointer;
      }
    }
    .active {
      background-color: #F85959;
      color: #ffffff;
    }
  }
  .t-Body{
    overflow: auto;
    padding: 20px;
    background: #f5f5f9;
  }
</style>
