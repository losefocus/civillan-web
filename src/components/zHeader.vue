<template>
<div style="height:100%;">
  <div class="hd-logo hd-left" :style="{backgroundImage: 'url(' + logoImg + ')' }"></div>
  <!--<span class="iconfont icon-collapse"></span>-->
  <div class="hd-name hd-left">工程施工实时监控系统</div>

  <img src="@/assets/header/label_close.png" class="hd-right hd-close" @click="close()">
  <div class="hd-uName hd-right">
    <el-dropdown trigger="click" placement="bottom" @command="handleCommand">
      <span class="el-dropdown-link" style="cursor: pointer">
        <div class="u-name">{{username}}</div><i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0">用户中心</el-dropdown-item>
        <!--<el-dropdown-item command="1">个人设置</el-dropdown-item>-->
        <el-dropdown-item command="1">消息通知</el-dropdown-item>
        <el-dropdown-item command="2">帮助中心</el-dropdown-item>
        <el-dropdown-item divided command="close">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <img v-if="avatarUrl" :src="avatarUrl" class="hd-right hd-portrait" >
  <div class="p-box hd-right" style="font-size: 28px;color: #E6EAEE;margin-right: 35px;vertical-align: middle;">|</div>
  <div @click="getMessage()" class="p-box hd-right" style="margin-right: 35px;cursor: pointer;">
    <el-badge :value=unReadCount :max="99" class="item" :hidden='isHidden'>
      <el-tooltip class="item" effect="dark" content="消息通知" placement="bottom">
        <i class="iconfont icon-message"></i>
      </el-tooltip>
    </el-badge>
  </div>
  <router-link to="/" class="p-box hd-right" style="margin-right: 40px" v-if="isMap">
    <el-tooltip class="item" effect="dark" content="项目地图" placement="bottom">
      <i class="iconfont icon-Rectanglex"></i>
    </el-tooltip>
    <!--<span class="p-name">项目地图</span>-->
  </router-link>

  <el-dialog
    :visible.sync="isOut"
    width="30%">
    <div style="font-size: 16px;padding: 16px 20px;font-weight: bold;">提示</div>
    <div style="width: calc(100% - 40px);font-size: 14px;padding: 20px;">您确定要退出该系统吗？</div>
    <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="isOut = false">取 消</el-button>
    <el-button size="small" type="danger" @click="out()">确 定</el-button>
  </span>
  </el-dialog>

  <el-dialog
    :visible.sync="dialogVisible"
    :width="dialogWidth"
    style="min-width: 1024px"
    top="8vh"
  >
    <ul class="t-header">
      <li v-for="(tab,index) in tHeader" :key="index" @click="changeTab(index)" :class="{active:index==tIndex}"> {{tab.name}}</li>
      <div @click="close()"></div>
    </ul>
    <n-message ref="child" :dialogTop="topChange" :is="currentView" keep-alive class="t-Body" :class="{'t-BodyHeight1':!topChange,'t-BodyHeight2':topChange}"></n-message>
  </el-dialog>

</div>
</template>

<script>
  import HCenter from '@/views/userCenter/HCenter.vue'
  import NMessage from '@/views/userCenter/NMessage.vue'
  import PSettings from '@/views/userCenter/PSettings.vue'
  import UCenter from '@/views/userCenter/UCenter.vue'

  import message from '@/api/userCenter/message'
  import userInfo from '@/api/userCenter/header'

  import no_photo from '@/assets/header/no_photo.png'
  import logo from '@/assets/login/logo.png'

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
         topChange:true,
         isOut:false,
         logoImg:logo,
         dialogTop:'15vh',//top值
         dialogWidth:'68%',//模态框宽度
         avatarUrl:'', //头像路径
         username:'',//用户名
         unReadCount:0, //未读信息数量
         isHidden:true, //未读信息数量是否显示
         dialogVisible: false, //模态框是否显示
         isMap:true, //地图入口是否显示
         tHeader:[
           {name:'用户中心'},
           /*{name:'个人设置'},*/
           {name:'消息通知'},
           {name:'帮助中心'},
         ],
         tBody:[
           'UCenter',
           /*'PSettings',*/
           'NMessage',
           'HCenter'
         ],
         tIndex:2,
         currentView:'NMessage'
       }
    },
    created(){
      let _this=this;
      let clientHeight=document.body.clientHeight;
      /*if(clientHeight<800){
        _this.dialogTop='6vh';
        _this.topChange=false;
      }else {
        _this.dialogTop='15vh';
        _this.topChange=true
      }
      window.onresize=function () {
        let cHeight=document.body.clientHeight;
        if(cHeight<800){
          _this.dialogTop='6vh';
          _this.topChange=false;
        }else {
          _this.dialogTop='15vh';
          _this.topChange=true
        }
      };*/


      this.$route.path=='/'?this.isMap=false:this.isMap=true;
      message.unReadCount().then(res=>{
        this.unReadCount=res.result;
        this.unReadCount==0? this.isHidden=true : this.isHidden=false;
      });

      this.initWebSocket();
    },
    mounted(){
      this.getInfo()
    },
    destroyed() {
      //页面销毁时关闭长连接
      this.websocketclose();
    },
    methods:{
      initWebSocket(){ //初始化webSocket
        if(this.$cookies.get('wsUrl')){
          console.log(this.$cookies.get('wsUrl'));
          let wsUrl='ws:'+this.$cookies.get('wsUrl');//ws地址
          //let wsUrl='ws://192.168.0.33:4050/ws/message/token=nT6yz42brkB7C02I+IYBeA==';//ws地址
          this.webSocket = new WebSocket(wsUrl);
          this.webSocket.onopen = this.websocketonopen;
          this.webSocket.onerror = this.websocketonerror;
          this.webSocket.onmessage = this.websocketonmessage;
          this.webSocket.onclose = this.websocketclose;
        }else{
          console.log('未登录')
        }
      },

      websocketonopen() {
        //console.log("WebSocket连接成功");
      },
      websocketonerror() { //错误
        //console.log("WebSocket连接发生错误");
      },
      websocketonmessage(res){ //数据接收
        console.log(res);
        this.unReadCount+=1;
        if(this.$refs.child){
          this.$refs.child.getList()
        }else {
          //console.log('没有子组件')
        }
      },
      websocketclose(){ //关闭
        //console.log("关闭");
      },
      getInfo(){
        //let userId=sessionStorage.getItem('token').substring(0,2);
        userInfo.userInfo().then(res=>{
          //console.log(res);
          if(res.result.avatarBaseUrl&&res.result.avatarPath){
            this.avatarUrl=res.result.avatarBaseUrl+res.result.avatarPath;
          }else {
            this.avatarUrl=no_photo;
          }
          this.username=res.result.name
        });
      },

      getMessage(){
        this.dialogVisible=true;
        this.tIndex=1;
        this.currentView=this.tBody[1]
      },
      changeTab(i){
        this.tIndex=i;
        this.currentView=this.tBody[i]
      },
      handleCommand(command) {
        if(command=='close'){
          this.close()
        }else {
          this.dialogVisible=true;
          this.tIndex=command;
          this.currentView=this.tBody[command];
        }
      },
      /*beforeunloadHandler (e) {
        e = e || window.event;
        this.$cookies.remove('token');
        // 兼容IE8和Firefox 4之前的版本
        /!*if (e) {
          e.returnValue = '关闭提示';
        }*!/

        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        //return '关闭提示';
      },*/
      close(){
        this.isOut=true

      },
      out(){
        let isLogin=this.$cookies.get('checked');
        if(isLogin){
          this.$router.push('/login')
        }else{
          if(window.$cookies.get('token')){
            window.$cookies.remove('token')
          }
          sessionStorage.removeItem('token');
          this.$router.push('/login')
        }
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
    width: 188px;
    height: 42px;
    background-size: cover;
  }
  .hd-name{
    width: 162px;
    height: 22px;
    padding-left: 20px;
    margin: 10px 0 0 35px;
    border-left: 2px solid #E6EAEE;
    color: #333333;
    font-size: 16px;
  }
  .hd-portrait{
    margin-top: 7px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .hd-uName{
    margin: 10px 0 0 10px;
  }
  .hd-close{
    margin: 13px 10px 0 30px;
    cursor: pointer;
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
    //height: 27px;
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
    padding: 10px;
    background: #f5f5f9;
  }
  .t-BodyHeight1{
    height: 460px;
  }
  .t-BodyHeight2{
    height: 480px;
  }
</style>
