<template>
 <div style="position: relative;height: 100%">
   <transition name="fade">
     <div class="b-device" v-if="noDevice"><div class="t-device">设备已离线！</div></div>
   </transition>
   <div class="r-box">
     <div class="t-box" :class="{'t-box1':classChange==1}">
       <div class="r-stateTab" :class="{'tabActive':!isTab}" @click="tabChange(0)">运行状况</div>
       <div class="p-designTab" :class="{'tabActive':isTab}" @click="tabChange(1)">设计参数</div>
     </div>
     <ul class="s-box1">
       <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
         <div class="i-id">
           <div class="d-model">{{deviceName[deviceIndex-1].name}}</div>
           <!--<div class="d-kind">
             <div v-for="(index,list) in deviceType" @click="deviceChange(index)" :class="{'deviceActive':index==deviceIndex}">{{index}}</div>
           </div>-->

         </div>
           <!--<div class="i-start">开始时间：<span>{{ RT_data.start_time/1 | formatDate }}</span></div>-->
         <div class="i-progress">
           <div class="i-progressName" style="width: 80px">成桩进度：</div>
           <el-progress :stroke-width="15" :text-inside="true" :percentage="progressNum " color="#24BCF7" style="width: calc(100% - 80px)"></el-progress>
           <div class="clear"></div>
         </div>
         <div class="i-box">
           <div class="i-body">
             <div class="i-name">喷凝系统</div>
             <div class="i-state"><span style="vertical-align: center">在线状态</span><div class="led-green" :class="{'led-green':RT_data.nozzle_sta==1,'led-gray':RT_data.nozzle_sta==0}"></div></div>
           </div>
           <div class="i-body">
             <div class="i-company">宏远建设记录仪一号</div>
             <div class="i-state"><span>养护状态</span><div class="led-green" :class="{'led-green':RT_data.record_sta==1,'led-gray':RT_data.record_sta==2,'led-blue':RT_data.record_sta==3}"></div></div>
           </div>
         </div>
         <div class="clear"></div>
         <div class="clear"></div>
         <div class="h-box">
           <div class="b-info"><span class="iconfont icon-portrait"></span><span class="i-info">张三三</span></div>
           <div class="b-info"><span class="iconfont icon-phonenew"></span><span class="i-info">186-1396-1168</span></div>
         </div>

         <div class="i-normal" v-if="isWarming">
           <p>设备正常运行中</p>
         </div>
         <div class="i-warning" v-else>
           <i class="iconfont icon-warming"></i>
           <div class="w-text">
             <p>{{warmingText}}</p>
           </div>
         </div>
       </li>
       <li class="s-info" :class="{'s-info1':classChange==1}" v-else="!isTab">
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
             <div class="p-progress" :style="{height:'70%'}">
               <div style="height: 100%;">
                 <div class="progressContainer">
                   <div class="progress" :style="{height:progressHeight}" style="font-size: 12px">
                     <div style="border-bottom: 3px solid #24BCF7;width: 32px;"></div>
                     <div style="margin-left: 35px;color: #24BCF7;margin-top: -9px;width: 60px"><!--{{ progress+'%'}}--><span style="font-size: 20px;font-weight: bold;">{{progress}}</span>米</div>
                   </div>
                   <span style="margin-left: -32px">0米</span>
                   <span style="position: absolute;bottom: 0;left:-45px;">100米</span>
                 </div>
               </div>
             </div>
           </div>
           <div class="p-title">深度</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-speed ref="sSpeed" :realTime="RT_data"></s-speed>
           </div>
           <div class="p-title">钻速</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-flow ref="sFlow" :realTime="RT_data"></s-flow>
           </div>
           <div class="p-title">流量</div>
         </div>
         <div class="p-box">
           <div class="p-echart">
             <s-current ref="sCurrent" :realTime="RT_data"></s-current>
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
  import deviceConfig from '@/api/device/deviceConfig.js'

  import aSp from '@/views/RState/AshPressureCurrent.vue'
  import pOperation from '@/views/RState/pileOperation.vue'
  import pMap from '@/views/RState/pileMap.vue'
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
  },
  data(){
    let data = [0,10,20,30,40,50,60,70,80,90,100];
    let Data=data;

    return {
      timer:null,//定时器,
      pileData:{
        ps:[],
        pile_id:{content:[{"label":"pile_position","name":"桩位置","value":"120.049345774,30.850305056"},{"label":"pile_depth","name":"桩长","value":"13"},{"label":"pile_diameter","name":"桩径","value":"0.25"}],
          createdAt:1535618538,
          createdBy:70,
          id:7533,
          key:"k2230_940_E17",
          name:"k2230_940_E17",
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
      DesignDeep:30,

      isWarming:true,//未发现问题显示
      warmingText:'',

      isTab:false,//设备型号切换
    }
  },
  props:['dialogFullscreen','deviceKey','isClose','clientWidth'],
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
    }
  },
  created(){
    this.getConfig();
    //this.getDeviceConfig(this.deviceKey);
    let deviceKey=sessionStorage.getItem('deviceKey');
    console.log(deviceKey);
    this.getData(deviceKey);
    this.getAlarms(deviceKey);
    /*this.timer=setInterval(()=>{
      this.getData(this.deviceKey);
      this.getAlarms(this.deviceKey)
    },5000);*/

  },
  mounted(){
    this.init();
    this.reload();
    const that = this;
    this.getPileData();

    let pile=document.getElementById('pile');
    let pileHeight,pileWidth;
    this.$nextTick(()=>{

      pileHeight = pile.offsetHeight;
      pileWidth = pile.offsetWidth;
      this.$refs.pMap.canvas.width = parseFloat(pileWidth);
      this.$refs.pMap.canvas.height = parseFloat(pileHeight);
      console.log(pileHeight,pileWidth);

      this.$refs.pMap.width = parseFloat(pileWidth);
      this.$refs.pMap.height = parseFloat(pileHeight);
    });

    setTimeout(()=>{
        this.$refs.pMap.width = parseFloat(pileWidth);
        this.$refs.pMap.height = parseFloat(pileHeight);
        if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()}
        if( that.$refs.aSp!==undefined){that.$refs.aSp.resize();}
        if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()}
        if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()}
    },100);
  },
  beforeDestroy(){
    clearInterval(this.timer);
    console.log('已销毁');
  },

  methods:{
    init(){
      let clientWidth=document.body.clientWidth;
      this.temp(this.dialogFullscreen,this.diameter,this,clientWidth)
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
          aa.forEach(item=>{
            let arr = JSON.parse(item.content);
            item.content=arr
          });
          this.pileData.ps=aa;
          if(this.$refs.pMap){this.$refs.pMap.init()}
        }else{
          console.log('CAD数据获取失败')
        }
      })
    },
    //实时数据
    getData(key){
      deviceData.list({'key':key}).then(res=>{
        console.log(res);
        if(res.success){
          this.RT_data=res.result;
          console.log(res);
          this.RT_data.status=1;
          this.RT_data.rdeep=Math.abs(this.RT_data.rdeep);
          this.RT_data.depth_design=30;

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
          this.noDevice=false;
        }
      }).catch(err=>{
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
        //console.log(res.result.items[0].message);
      })
    },
    //设备配置参数
    /*getDeviceConfig(post_data){
      deviceConfig.list({'device_id':post_data}).then(res=>{
        console.log(res)
      })
    },*/

    //报警信息
    getAlarms(key){
      deviceData.alarms({'key':key}).then(res=>{
        //console.log(res.result[0].message);
        if(res.result){
          this.isWarming=false;
          this.warmingText=res.result[0].message
        }else{
          this.isWarming=true
        }
      }).catch(e=>{
        console.log(e)
      })
    }
  },


  watch:{
    dialogFullscreen:function (val,oldVal) {
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
      console.log(val,oldVal)
    },
    clientWidth(val,oldVal){
      this.$nextTick(()=>{
        let pile=document.getElementById('pile');
        if(!pile){
          //console.log('dom销毁')
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
        padding: 25%;
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
        .i-id{
          font-size: 20px;
          color: rgba(218,218,218,1);
          width:100%;
          height: 10%;
          margin-top: 10%;
          overflow: hidden;
          .d-model{
            float: left;
            width: 50%;
            font-size: 30px;
            font-weight: bold;
            color: #333333;
          }
        }
        .i-box{
          height: 20%;
          .i-body{
            width: 100%;
            height: 40%;
            font-weight: bold;
            .i-name{
              float: left;
              font-size:15px;
              color:rgba(51,51,51,1);
            }
            .i-company{
              float: left;
              font-size:10px;
              color:rgba(51,51,51,1);
            }
            .i-state{
              float: right;
              font-size:10px;
              color:rgba(153,153,153,1);
              .led-green{
                vertical-align: middle;
                display: inline-block;
                background-color: #00ff00;
                width: 6px;
                height: 6px;
                box-shadow: 0px 0px 2px 4px #26c702;
                -moz-box-shadow: 0px 0px 2px 4px #26c702;
                -webkit-box-shadow: 0px 0px 2px 4px #26c702;
                border-radius: 50%;
              }
              .led-gray{
                display: inline-block;
                background-color: #FFAB35;
                width: 6px;
                height: 6px;
                box-shadow: 0px 0px 2px 4px #FFAB35;
                -moz-box-shadow: 0px 0px 2px 4px #FFAB35;
                -webkit-box-shadow: 0px 0px 2px 4px #FFAB35;
                border-radius: 50%;
              }
              .led-blue{
                display: inline-block;
                background-color: #403BFF;
                width: 6px;
                height: 6px;
                box-shadow: 0px 0px 2px 4px #403BFF;
                -moz-box-shadow: 0px 0px 2px 4px #403BFF;
                -webkit-box-shadow: 0px 0px 2px 4px #403BFF;
                border-radius: 50%;
              }
              span{
                vertical-align: middle;
                margin-right: 20px;
              }
            }
            .icon-portrait{
              color: #787F87;
            }
            .icon-phonenew{
              color: #787F87;
            }
          }
          .icon-state{
            font-size: 12px;
            color: #24BCF7;
          }
        }
        .h-box{
          width: 100%;
          height: 20%;
          overflow: hidden;
          .b-info{
            width: 60%;
            height: 40%;
            font-weight: bold;
            .i-info{
              margin-left: 10px;
            }
            .icon-portrait{
              color: #787F87;
            }
            .icon-phonenew{
              color: #787F87;
            }
          }
        }
        .i-progress{
          width: 100%;
          margin-top: 5%;
          height: 10%;
          overflow: hidden;
          div{
            float: left;
          }
        }
        .i-normal{
          width:100%;
          text-align: center;
          height:15%;
          background:rgba(141,232,240,0.06);
          padding-top: 13%;
        }
        .i-warning{
          width:100%;
          height:25%;
          line-height: 45px;
          background:rgba(248,89,89,0.06);
          text-align: center;
          overflow: auto;
          .icon-warming{
            vertical-align: top;
            color: #DF2A2A;
          }
          .w-text{
            margin-left: 10px;
            max-width: 80%;
            vertical-align: top;
            display: inline-block;
            text-align: left;
          }
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
      /*.s-info1{
        .i-id{
          //font-size:30px;
          color:#DADADA;
          line-height:42px;
          .d-model{
            font-weight: bold;
            width: 250px;
            font-size: 35px;
            color: #333333;
          }
          .d-kind{
            height: 40px;
            div{
              width: 30px;
              height: 30px;
              line-height: 30px;
              border-radius: 50%;
              border: 1px solid rgba(218,218,218,1);
              text-align: center;
              margin:0 10px;
            }
          }
        }
        .deviceActive{
          font-size:20px;
          background: #24BCF7;
          color:#ffffff;
        }
        .i-box{
          display: flex;
          justify-content:space-between;
          height: 20%;
          .i-body{
            width: 60%;
            height: 45px;
            line-height: 45px;
            font-weight: bold;
            .i-name{
              font-size:18px;
              color:rgba(51,51,51,1);
            }
            .b-info{
              .i-info{
                display: inline-block;
                margin-left: 10px;
                color: #999999;
                font-size: 12px;
              }
            }

            .i-company{
              font-size:14px;
              color:rgba(153,153,153,1);
            }
          }
          .i-state{
            line-height: 45px;
            font-size:14px;
            color:rgba(153,153,153,1);
          }
          .icon-state{
            font-size: 14px;
            color: #24BCF7;
            margin-right: 20px;
          }
        }

        .i-start{
          width:100%;
          height:17px;
          font-size:16px;
          color:rgba(102,102,102,1);
          line-height:17px;
        }
        .i-progress{
          margin-top: 20px;
          width: 100%;
          height: 15px;
          line-height: 15px;
          display: flex;
          justify-content:space-between;
          .i-progressName{
            font-size: 14px;
          }
        }
        .i-normal{
          width:100%;
          //line-height: 57px;
          text-align: center;
          height:120px;
          background:rgba(141,232,240,0.06);
        }
        .i-warning{
          width:100%;
          height:80px;
          line-height: 40px;
          background:rgba(248,89,89,0.06);
          text-align: center;
          .icon-warming{
            vertical-align: top;
            color: #DF2A2A;
          }
          .w-text{
            max-width: 80%;
            margin-left: 10px;
            vertical-align: top;
            display: inline-block;
          }
        }

        .d-name{
          i{
            font-size: 20px;
          }
          span{
            margin-left: 5%;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .d-box{
          height: 60%;
          display: flex;
          flex-direction: row;!*决定主轴的方向*!
          flex-wrap:wrap;
          justify-content:space-around;
          div{
            width: 33.3%;
          }
          .d-key{
            font-size: 16px;
            margin-top: 30px;
            color: #666666;
          }
          .d-value{
            font-weight: bold;
            height: 30px;
            font-size: 25px;
            color: #333333;
          }
          .d-value1{
            font-weight: bold;
            height: 30px;
            font-size: 26px;
            color: #333333;
          }
        }
      }*/

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
            font-size:16px;
            color:#000000;
          }
          .p-echart{
            width: 100%;
            overflow: hidden;
            height: calc( 100% - 30px);
            .p-progress{
              margin:18% 0 0 45%;
            }
          }
        }
      }
      /*.s-progress1{
        .p-box{
          !*margin-bottom: 6%;
          .p-progress{
            .p-title{
              font-size: 18px;
            }
          }
          .p-name{
            font-size:18px;
          }
          .p-completedSteps{
            font-size: 40px;
          }
          .p-totalSteps{
            font-size: 18px;
          }
          .p-unit{
            font-size: 18px;
          }
          .p-title{
            font-size:18px;
          }
        }*!}
      }*/
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
