<template>
 <div style="position: relative;height: 100%">
   <transition name="fade">
     <div class="b-device" v-if="noDevice"><div class="t-device">设备已离线！</div></div>
   </transition>
   <div class="r-box">
     <div class="t-box">
       <div class="r-stateTab" :class="{'tabActive':!isTab}" @click="tabChange(0)">运行状况</div>
       <div class="p-designTab" :class="{'tabActive':isTab}" @click="tabChange(1)">设计参数</div>
     </div>
     <ul class="s-box1">
       <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
         <device-info :realData="RT_data" ></device-info>
       </li>
       <li class="s-info" :class="{'s-info1':classChange==1}" v-else>
         <div class="d-name">
           <i class="iconfont icon-pie"></i>
           <span>桩设计参考值</span>
         </div>
         <div class="d-box">
           <div>
             <p class="d-key">桩间距</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">桩长</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">桩径</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">水灰比</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">灰量</p>
             <p class="d-value">30</p>
           </div>
           <div>
             <p class="d-key">工艺</p>
             <p class="d-value1">{{RT_data.process_type}}</p>
           </div>
         </div>
       </li>
       <li class="s-chart" v-if="isRouterAlive">
         <a-sp :dataInfo="RT_data" ref="aSp"></a-sp>
       </li>
       <li class="s-chart" id="pile">
        <!-- <chart :options="ElectricCurrent" :auto-resize=true></chart>-->
         <p-map :data-info="pileData" ref="pMap"></p-map>
       </li>
     </ul>
     <ul class="s-box2">
       <li class="s-progress" :class="{'s-progress1':classChange==1}">
         <div class="p-box" >
           <div class="p-echart" style="">
             <div class="p-progress" :style="{height:'75%'}">
               <div style="height: 100%;">
                 <div class="progressContainer">
                   <div class="progress" :style="{height:progressHeight}" style="font-size: 12px">
                     <div style="border-bottom: 3px solid #24BCF7;width: 23px;"></div>
                     <div style="margin-left: 25px;color: #24BCF7;margin-top: -9px;width: 60px"><!--{{ progress+'%'}}--><span style="font-size: 16px;font-weight: bold;">{{progress}}</span></div>
                   </div>
                   <span style="margin-left: -25px">0米</span>
                   <span style="position: absolute;bottom: 0;left:-40px;">100米</span>
                 </div>
               </div>
             </div>
           </div>
           <div class="p-title">深度</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-speed ref="sSpeed" :dataInfo="RT_data"></s-speed>
           </div>
           <div class="p-title">钻速</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-flow ref="sFlow" :dataInfo="RT_data"></s-flow>
           </div>
           <div class="p-title">流量</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-current ref="sCurrent" :dataInfo="RT_data"></s-current>
           </div>
           <div class="p-title">电流</div>
           <!--<div id="myChart2" style="width: 100%;height: 100%"></div>-->
         </div>
       </li>
       <li class="s-chart1">
         <p-operation :dataInfo="RT_data"></p-operation>
       </li>
     </ul>
   </div>
 </div>
</template>

<script>
  import echarts from 'echarts'
  import RadialProgressBar from 'vue-radial-progress'
  import sCurrent from '@/views/RState/sCurrent'
  import sSpeed from '@/views/RState/sSpeed'
  import sFlow from '@/views/RState/sFlow'
  import {formatDate} from '@/common/formatDate.js';

  import deviceData from '@/api/device/deviceData'
  import config from '@/api/configure/config.js'
  import deviceUser from '@/api/device/deviceUser.js'
  import deviceConfig from '@/api/device/deviceConfig.js'

  import aSp from '@/views/RState/AshPressureCurrent.vue'
  import pOperation from '@/views/RState/pileOperation.vue'
  import pMap from '@/views/RState/pileMap.vue'
  import deviceInfo from '@/views/RState/deviceInfo.vue'
  import Bus from '@/common/eventBus'
export default {
  name: "runningState",
  components:{
    RadialProgressBar,
    sCurrent,
    sSpeed,
    sFlow,
    aSp,
    pOperation,
    pMap,
    deviceInfo,
  },
  data(){
    let data = [0,10,20,30,40,50,60,70,80,90,100];
    let Data=data;

    return {
      timer:null,//定时器,
      pileData:{
        ps:[],
        pile_id:{content:[{"label":"pile_position","name":"桩位置","value":"120.044018147,30.858786963"},{"label":"pile_depth","name":"桩长","value":"11"},{"label":"pile_diameter","name":"桩径","value":"0.25"}],
          createdAt:1535618538,
          createdBy:70,
          id:7533,
          key:"k2230_940_D7",
          name:"k2230_940_D7",
          projectId:21,
          sort:0,
          status:2,
          tenant:"21fe87251b01541399c7c1a8cec741c5",
          typeId:124,},
      },
      angelWidth:0,
      noDevice:false,
      deviceType:['1','2','3'],
      deviceIndex:1,
      deviceName:[
        {name:'NB-001'},{name:'NB-002'},{name:'NB-003'}
      ],
      isShow:true,
      titleActive:'1',//设备样式切换
      classChange:1,//改变样式
      isRouterAlive: true, //ECharts刷新
      completedSteps:3,//进度条中已完成步骤的数量

      rflow:3,//流量实时数据
      rspeed:3,//速度实时数据
      rcurrent:3,//电流实时数据

      RT_data:{}, //实时数据

      slurryData:[], //段浆量
      ashData:[], //段灰量
      rpressureData:[], //段灰量
      progressNum:40,//深度进度
      progress:0,
      progressHeight:'',
      DesignDeep:100,

      isTab:false,//设备型号切换,

    }
  },
  props:['dialogFullScreen','deviceKey','isClose','clientWidth'],
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
    }
  },
  created(){
    this.getConfig();
    //this.getDeviceConfig(this.deviceKey);
    let deviceKey=this.$store.state.project.deviceKey;
    this.getData(deviceKey);

    this.timer=setInterval(()=>{
      this.getData(deviceKey);
    },5000);

  },
  mounted(){
    this.init();
    this.reload();
    this.getPileData();
    this.getDeviceInfo();
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },

  methods:{
    init(){
      let clientWidth=document.body.clientWidth;
      this.temp(this.dialogFullscreen,this.diameter,this,clientWidth);
      let pile=document.getElementById('pile');
      let pileHeight,pileWidth;
      this.$nextTick(()=>{
        if(pile){
          pileHeight = pile.offsetHeight;
          pileWidth = pile.offsetWidth;
          this.$refs.pMap.canvas.width = parseFloat(pileWidth);
          this.$refs.pMap.canvas.height = parseFloat(pileHeight);
          this.$refs.pMap.width = parseFloat(pileWidth);
          this.$refs.pMap.height = parseFloat(pileHeight);
        }
      });
      setTimeout(()=>{
        this.$refs.pMap.width = parseFloat(pileWidth);
        this.$refs.pMap.height = parseFloat(pileHeight);
        if( this.$refs.sCurrent!==undefined){this.$refs.sCurrent.resize()}
        if( this.$refs.aSp!==undefined){this.$refs.aSp.resize();}
        if( this.$refs.sSpeed!==undefined){this.$refs.sSpeed.resize()}
        if( this.$refs.sFlow!==undefined){this.$refs.sFlow.resize()}
      },100);
    },
    //设备信息
    getDeviceInfo(){
      this.deviceInfo1=JSON.parse(sessionStorage.getItem('deviceInfo'));
      console.log(this.deviceInfo1.status);
      if(this.deviceInfo1.status==11){
        this.noDevice=false;
      }else{
        this.noDevice=true;
        this.RT_data=[];
        clearInterval(this.timer);
      }
    },
    deviceChange(index){
      this.deviceIndex=index;
    },
    temp(isDialog,diameter,that,clientWidth) {
      if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()}
      if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()}
      if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()}
      if( that.$refs.aSp!==undefined){this.$refs.aSp.resize();}
    },
    tabChange(x){
      if(x==0){
        this.isTab=false;
      }else {
        this.isTab=true;
      }
    },
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },

    getPileData(){
      config.list({page_index:1, page_size:10000}).then(res=>{
        if(res.success){
          let aa = res.result.items;
          aa.forEach((item,index)=>{
            let arr = JSON.parse(item.content);
            item.content=arr
          });
          this.pileData.ps=aa;
          if(this.$refs.pMap){
            this.$refs.pMap.init()}
          }else{
        //console.log('CAD数据获取失败')
        }
      })
    },
    //实时数据
    getData(key){
      deviceData.list({'key':key}).then(res=>{
        if(res.success){
          res.result.rdeep=parseFloat(res.result.rdeep);
          this.RT_data=res.result;
          this.RT_data.status=1;
          this.RT_data.rdeep=Math.abs(this.RT_data.rdeep);
          this.RT_data.depth_design=100;

          this.rflow=res.result.rflow;
          this.rspeed=Math.abs(res.result.rspeed);
          this.rcurrent=res.result.rcurrent;
          this.progress=res.result.rdeep.toFixed(2);
          if(isNaN(this.progress)){
            this.progress=0
          }
          this.progressHeight=(1-(this.progress/parseFloat(this.DesignDeep)))*100+'%';

          let par_slurry=res.result.par_slurry;
          let par_ash=res.result.par_ash;
          let rpressure=res.result.rpressure;

          this.slurryData.push(par_slurry);
          this.ashData.push(par_ash);
          this.rpressureData.push(rpressure);
        }else {
          this.progressHeight='100%';
        }
      }).catch(err=>{
        this.progressHeight='100%';
      });
    },
    getStyle(obj,attr) {
      if(obj.currentStyle)
      {
        return obj.currentStyle[attr];
      }else{
        return getComputedStyle(obj,false)[attr];
      }
    },
    //项目配置参数
    getConfig(){
      let projectId=this.$cookies.get('projectId');
      config.list({'project_id':projectId,'name':'k2230_940_C18'}).then(res=>{
      })
    },
    //设备配置参数
    /*getDeviceConfig(post_data){
      deviceConfig.list({'device_id':post_data}).then(res=>{
      })
    },*/
  },


  watch:{
    dialogFullScreen:function (val,oldVal) {
      let _this=this;
      let clientWidth=document.body.clientWidth;
      _this.temp(val,_this.diameter,_this,clientWidth);
      _this.$nextTick(()=>{
        let pile=document.getElementById('pile');
        let pileHeight = window.getComputedStyle(pile).height;
        let pileWidth = window.getComputedStyle(pile).width;
        _this.$refs.pMap.canvas.width = parseFloat(pileWidth);
        _this.$refs.pMap.canvas.height = parseFloat(pileHeight);
        _this.$refs.pMap.width = parseFloat(pileWidth);
        _this.$refs.pMap.height = parseFloat(pileHeight);
        _this.$refs.pMap.init();
      });
    },
    isClose(val,oldVal){
    },
    clientWidth(val,oldVal){
      this.$nextTick(()=>{
        let pile=document.getElementById('pile');
        if(!pile){
        }else{
          let pileHeight,pileWidth;
          if(pile.currentStyle){
            pileHeight = pile.currentStyle.height;
            pileWidth = pile.currentStyle.width
          }else {
            pileHeight = window.getComputedStyle(pile).height;
            pileWidth = window.getComputedStyle(pile).width;
          }
          this.$refs.pMap.canvas.width = parseFloat(pileWidth);
          this.$refs.pMap.canvas.height = parseFloat(pileHeight);
          this.$refs.pMap.width = parseFloat(pileWidth);
          this.$refs.pMap.height = parseFloat(pileHeight);
          this.$refs.pMap.init();
        }
      });

      if( this.$refs.sCurrent!==undefined){this.$refs.sCurrent.resize()}
      if( this.$refs.aSp!==undefined){this.$refs.aSp.resize();}
      if( this.$refs.sSpeed!==undefined){this.$refs.sSpeed.resize()}
      if( this.$refs.sFlow!==undefined){this.$refs.sFlow.resize()}
      this.temp(this.dialogFullscreen,this.diameter,this,val)
    }
  }
}
</script>

<style scoped lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  .progressContainer{
    position: relative;
    height: 100%;
    width: 20px;
    background-color: #24BCF7;
  }
  .progress{
    background-color: #ddd;
    width:20px;
    line-height: 15px;
    position: absolute;
    bottom: 0;
    transition: 0.5s linear;
  }

  .p-title{

  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .b-device{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.7);
    z-index: 10;
    overflow: hidden;
    text-align: center;
    display: table;
    .t-device{
      display: table-cell;
      vertical-align: middle;
      color: #666666;
      font-size: 30px;
    }
  }
  .r-box{
    padding-left: 2%;
    height: 100%;
    position: relative;
    .t-box{
      cursor: pointer;
      width: 2%;
      position: absolute;
      left:0;
      .r-stateTab{
        padding: 20%;
        height: 50%;
        text-align: center;
        font-size: 12px;
        border-radius:4px 0 0 0;
        border:1px solid rgba(206,206,206,1);
      }
      .p-designTab{
        padding: 20%;
        height: 50%;
        text-align: center;
        font-size: 12px;
        border-radius:0 0 0 4px;
        border:1px solid rgba(206,206,206,1);
      }
      .tabActive{
        background: #828282;
        color: #fff;
        border: 1px solid #828282;
      }
    }

    .clear{
      clear: both;
    }
    .s-box1,.s-box2{
      height: 49%;
      background-color: #F5F5F9;
      overflow: hidden;
      .s-info{
        float: left;
        width:23%;
        height: 100%;
        padding:0 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        .deviceActive{
          font-size:20px;
          background: #24BCF7;
          color:#ffffff;
        }
        .d-name{
          margin-top: 20px;
          span{
            margin-left: 5%;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .d-box{
          height: 60%;

          div{
            margin-top: 50px;
            float: left;
            text-align: center;
            width: 33%;
          }
          .d-key{
            font-size: 14px;
            color: #666666;
          }
          .d-value{
            margin-top: 10px;
            font-weight: bold;
            height: 30px;
            font-size: 25px;
            color: #333333;
          }
          .d-value1{
            margin-top: 10px;
            font-weight: bold;
            height: 30px;
            font-size: 25px;
            color: #333333;
          }
        }
      }

      .s-progress{
        float: left;
        width:23%;
        height: calc(100% - 20px);
        padding:10px 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        .p-box{
          width: 50%;
          height: 50%;
          float: left;
          .p-progress{
            .p-title{
              width: 50%;
              font-size: 12px;
              color: #999999;
              text-align: center;
              position: absolute;
              bottom: -20px;
              //position: relative;
            }
          }
          .p-name{
            width: 40px;
            position: absolute;
            bottom: -22px;

            font-size:12px;
            color:rgba(151,151,151,1);
          }
          .p-completedSteps{
            font-size: 25px;
            font-weight: bold;
          }
          .p-totalSteps{
            font-size: 12px;
          }
          .p-unit{
            font-size: 12px;
          }

          .p-title{
            text-align: center;
            width: 100%;
            height: 30px;
            font-size:14px;
            color:#000000;
          }
          .p-echart{
            width: 100%;
            overflow: hidden;
            height: calc( 100% - 30px);
            .p-progress{
              margin:15% 0 0 40%;
            }
          }
        }
      }
      .s-chart{
        float: left;
        height: 100%;
        margin-left: 10px;
        width:calc( 38.5% - 30px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
      }
      .s-chart1{
        float: right;
        height: 100%;
        width:calc(77% - 50px);
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
      }
    }
    .s-box1{
      padding: 0 0 10px 0;
    }
  }

</style>
