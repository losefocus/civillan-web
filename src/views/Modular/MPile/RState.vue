<template>
 <div style="position: relative;height: 100%">
   <div class="b-control" v-if="isConctrol">
     <el-button size="mini" @click="start()">开始</el-button>
     <el-button size="mini" @click="replay()">重播</el-button>
     <el-button size="mini" @click="stop()">暂停</el-button>
     <el-button size="mini" @click="end()">结束</el-button>

     <el-dropdown style="margin-left: 10px;" size="mini" split-button  trigger="click"  @command="accelerate">
       播放速度
       <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command="3000">正常</el-dropdown-item>
         <el-dropdown-item command="2000">2倍</el-dropdown-item>
         <el-dropdown-item command="1000">3倍</el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown>
   </div>
   <transition name="fade">
     <div class="b-device" v-if="noDevice"><div class="t-device">{{typeName}}</div></div>
   </transition>
   <div class="r-box">
     <div class="t-box">
       <div class="r-stateTab" :class="{'tabActive':!isTab}" @click="tabChange(0)">运行状况</div>
       <div class="p-designTab" :class="{'tabActive':isTab}" @click="tabChange(1)">设计参数</div>
     </div>
     <ul class="s-box1">
       <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
         <device-info :realData="RT_data"></device-info>
       </li>
       <li class="s-info" :class="{'s-info1':classChange==1}" v-else>
         <div class="d-name">
           <i class="iconfont icon-pie"></i>
           <span>桩设计参考值</span>
         </div>
         <div class="noConfig" v-if="noConfig">未找到当前作业的配置参数</div>
         <div v-else class="d-box">
           <template>
             <el-table
               :data="config_data"
               border
               style="width: 100%;height: calc(100% - 30px);overflow: auto">
               <el-table-column
                 prop="name"
                 align="center"
                 label="名称">
               </el-table-column>
               <el-table-column
                 prop="value"
                 align="center"
                 :show-overflow-tooltip="true"
                 label="值">
               </el-table-column>
             </el-table>
           </template>
         </div>
       </li>
       <li class="s-chart" v-if="isRouterAlive">
         <a-sp :dataInfo="RT_data" ref="aSp" :isReplay="isReplay" :historyRT="historyRT"></a-sp>
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
                   <span style="position: absolute;bottom: 0;left:-40px;">{{DesignDeep}} 米</span>
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
           <div class="p-title">速度</div>
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
         <p-operation :dataInfo="RT_data" :historyRT="historyRT"></p-operation>
       </li>
     </ul>
   </div>
 </div>
</template>

<script>
  import RadialProgressBar from 'vue-radial-progress'
  import sCurrent from '@/views/Modular/MPile/RState/sCurrent'
  import sSpeed from '@/views/Modular/MPile/RState/sSpeed'
  import sFlow from '@/views/Modular/MPile/RState/sFlow'
  import {formatDate} from '@/common/formatDate.js';

  import deviceData from '@/api/device/deviceData'
  import config from '@/api/configure/config.js'
  import deviceConfig from '@/api/device/deviceConfig.js'

  import aSp from '@/views/Modular/MPile/RState/AshPressureCurrent.vue'
  import pOperation from '@/views/Modular/MPile/RState/pileOperation.vue'
  import pMap from '@/views/Modular/MPile/RState/pileMap.vue'
  import deviceInfo from '@/views/Modular/MPile/RState/deviceInfo.vue'
  import { mapActions , mapState} from 'vuex'
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
      timer1:null,
      noConfig:true,
      pileData:{
        ps:[],
        pile_id:{},
      },
      angelWidth:0,
      noDevice:false,
      deviceHead:[],
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
      progressHeight:'100%',
      DesignDeep:20,

      isTab:false,//设备型号切换,

      config_post_data:{},
      config_data:{},
      sensorConfig:{},
      num:0,
      timeSpeed:2000,
      isReplay:false,
      ss:false,

      historyData:[],
      isConctrol:false,

      controlHead:1,
      historyRT:[],

      typeName:'',
    }
  },
  props:['dialogFullScreen','deviceKey','isClose','clientWidth','isDevice'],
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
    }
  },
  computed: {
    ...mapState({changeTab:state=>state.project.changeTab}),
    ...mapState({token:state=>state.project.backTab})
  },
  created(){
    this.$bus.on('deviceHead',res=>{
      this.controlHead=res;
      let deviceKey=this.$store.state.project.deviceKey;
      this.getData(deviceKey);
      this.historyReal();
    });

    this.historyReal();
    this.changeData()
  },
  mounted(){
    this.init();
    this.getDeviceInfo();
  },
  beforeDestroy(){
    this.num=0;
    this.closeTab();
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },

  methods:{
    ...mapActions('backTab',['incrementBack']),
    ...mapActions('changeTab',['incrementTab']),



    closeTab(){
      this.$store.dispatch('incrementTab',false);
    },
    //设备信息
    getDeviceInfo(){
      this.deviceInfo1=JSON.parse(sessionStorage.getItem('deviceInfo'));
      if(this.deviceInfo1){
        if(this.deviceInfo1.status==11){
          this.noDevice=false;
        }else if(this.deviceInfo1.status==0){
          this.typeName='该设备未激活';
          this.getDeviceState()
        }else if(this.deviceInfo1.status==1){
          this.typeName='该设备已离线';
          this.getDeviceState()
        }else if(this.deviceInfo1.status==2){
          this.typeName='该设备已离场';
          this.getDeviceState()
        }else if(this.deviceInfo1.status==21){
          this.typeName='该设备故障中';
          this.getDeviceState()
        }else{

        }
      }
    },
    getDeviceState(){
      if(this.$store.state.project.changeTab==true){
        this.noDevice=false;
      }else{
        this.noDevice=true;
        this.RT_data={};
        this.RT_data.depth_design=20;
      }
    },
    //历史数据和实时数据的切换
    changeData(){
      if(this.$store.state.project.changeTab==true){
        this.getHistory();
        this.isConctrol=true;
        clearInterval(this.timer1);
        this.timer=setInterval(()=>{
          this.playBack()
        }, this.timeSpeed);
      }else{
        this.isConctrol=false;
        let deviceKey=this.$store.state.project.deviceKey;

        this.getData(deviceKey);
        this.timer1=setInterval(()=>{
          this.getData(deviceKey);
        },3000);
      }
    },

    //历史回放
    //开始
    start(){
      clearInterval(this.timer);
      this.timer=setInterval(()=>{
        this.playBack()
      }, this.timeSpeed);
    },
    //重播
    replay(){
      clearInterval(this.timer);
      this.isReplay=true;
      this.num=0;
      this.timer=setInterval(()=>{
        this.playBack()
      }, this.timeSpeed);
    },
    //暂停
    stop(){
      clearInterval(this.timer)
    },
    //结束
    end(){
      if(this.isDevice){
        this.$bus.emit('deviceEnd',true);
        this.$store.dispatch('incrementTab',true);
      }else{
        this.$bus.emit('allEnd',false)
      }
    },
    //播放速度
    accelerate(command){
      clearInterval(this.timer);
      this.timeSpeed=command;
      this.timer=setInterval(()=>{
        this.playBack()
      }, this.timeSpeed);
    },
    //获取后台历史数据
    getHistory(){
      let replayData=sessionStorage.getItem('replayData');
      let post_data=JSON.parse(replayData);
      console.log(post_data);
      deviceData.replay(post_data).then(res=>{
        this.historyData=res.result;
        console.log(res.result);
      }).catch(e=>{

      })
    },
    //数据输出
    playBack(){
      this.isReplay=false;
      let result=this.historyData;
      this.RT_data= Object.assign({},result[this.num]);
      this.progress=Number(this.RT_data.rdeep).toFixed(2);
      if(isNaN(this.progress)){this.progress=0}
      this.progressHeight=(1-(this.progress/parseFloat(this.DesignDeep)))*100+'%';
      this.RT_data.depth_design=this.DesignDeep;
      this.num=this.num+1;
      //如果超过数组长度，清除定时器
      if(this.num>=result.length){
        clearInterval(this.timer)
      }
    },


    //实时历史
    historyReal(){
      deviceData.history({key:this.$store.state.project.deviceKey}).then(res => {
        let historyData=[];
        res.result.forEach(item=>{
          item=JSON.parse(item);
          let headNum=Number(this.$store.state.project.deviceKey.substring(3,4));
          if(headNum>1){
            let rawData=item;
            let arr=['expand_sta','nozzle_sta','par_ash','par_slurry','pile_describe','pile_id','process_type','rcurrent'
              ,'rdeep','rdensity','rdip_angle','record_sta','rflow','rlatitude','rlongitude','rpipe_sta','rpressure','rspeed'];
            let commonObj={'device_key':'','machine_key':'','real_time':'','start_time':'','status':''};
            for(let i in commonObj){
              for(let j in rawData){
                if(i==j){
                  commonObj[i]=rawData[i];
                  delete rawData[i];
                }
              }
            }
            let array = [];
            for(let i=0;i<headNum;i++){
              let obj={}
              for(let j=0;j<arr.length;j++){
                obj[arr[j]] = i==0?rawData[arr[j]]:rawData[arr[j]+(i+1)]
              }
              array.push(obj)
            }
            historyData.push(Object.assign(array[Number(this.controlHead)-1],commonObj))
          }else{
            historyData.push(item);
          }
        });
        this.historyRT=historyData
      }).catch(e=>{

      });
    },

    //实时数据
    getData(key){
      deviceData.list({'key':key}).then(res=>{
        if(res.success){
          let headNum=Number(this.$store.state.project.deviceKey.substring(3,4));
          if(headNum>1){
            let rawData=res.result;
            let arr=['expand_sta','nozzle_sta','par_ash','par_slurry','pile_describe','pile_id','process_type','rcurrent'
              ,'rdeep','rdensity','rdip_angle','record_sta','rflow','rlatitude','rlongitude','rpipe_sta','rpressure','rspeed'];
            let commonObj={'depth_design':'','device_key':'','machine_key':'','real_time':'','start_time':'','status':''};
            for(let i in commonObj){
              for(let j in rawData){
                if(i==j){
                  commonObj[i]=rawData[i];
                  delete rawData[i];
                }
              }
            }
            let array = [];
            for(let i=0;i<headNum;i++){
              let obj={}
              for(let j=0;j<arr.length;j++){
                obj[arr[j]] = i==0?rawData[arr[j]]:rawData[arr[j]+(i+1)]
              }
              array.push(obj)
            }
            this.RT_data= Object.assign(array[Number(this.controlHead)-1],commonObj);
            this.RT_data.depth_design=this.DesignDeep;
          }else{
            this.RT_data= res.result;
            this.RT_data.depth_design=this.DesignDeep;
          }

          res.result.rdeep=parseFloat(res.result.rdeep);
          this.progress=this.RT_data.rdeep.toFixed(2);
          if(isNaN(this.progress)){this.progress=0}
          this.progressHeight=(1-(this.progress/parseFloat(this.DesignDeep)))*100+'%';

          if(this.config_post_data!=res.result.pile_describe){
            this.config_post_data=res.result.pile_describe;
          }

        }else {
          this.progressHeight='100%';
        }
      }).catch(err=>{
        this.progressHeight='100%';
      });
    },

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
        if( this.$refs.aSp!==undefined){this.$refs.aSp.resize();}
        if( this.$refs.sCurrent!==undefined){this.$refs.sCurrent.resize()}
        if( this.$refs.sSpeed!==undefined){this.$refs.sSpeed.resize()}
        if( this.$refs.sFlow!==undefined){this.$refs.sFlow.resize()}
      },100);
    },

    //切换设备
    deviceChange(index){
      this.deviceIndex=index;
    },

    //子组件的自适应
    temp(isDialog,diameter,that,clientWidth) {
      if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()}
      if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()}
      if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()}
      if( that.$refs.aSp!==undefined){this.$refs.aSp.resize();}
    },

    //运行状态，
    tabChange(x){
      if(x==0){
        this.isTab=false;
      }else {
        this.isTab=true;
      }
    },

    //dom重新渲染
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },

    //根据桩号获取相应的配置参数
    config_all(post_data){
      Promise.all([deviceConfig.list({'key':post_data}),config.list({page_index:1, page_size:10000})]).then(res=>{
        this.pileData.pile_id=res[0].result;
        if(res[0].result!=undefined){
          this.config_data=JSON.parse(res[0].result.content);
          this.noConfig=false
        }else{
          this.noConfig=true;
          this.DesignDeep=20;
        }

        let aa = res[1].result.items;
        aa.forEach((item,index)=>{
          let arr = JSON.parse(item.content);
          item.content=arr
        });
        this.pileData.ps=aa;
        if(this.$refs.pMap){
          this.$refs.pMap.init()
        }else{
        //console.log('CAD数据获取失败')
        }
      })
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
    //设备变量参数
  },


  watch:{
    dialogFullScreen:function (val,oldVal) {
      let _this=this;
      let clientWidth=document.body.clientWidth;
      _this.temp(val,_this.diameter,_this,clientWidth);
      _this.$nextTick(()=>{
        let pile=document.getElementById('pile');
        if(pile){
          let pileHeight = window.getComputedStyle(pile).height;
          let pileWidth = window.getComputedStyle(pile).width;
          _this.$refs.pMap.canvas.width = parseFloat(pileWidth);
          _this.$refs.pMap.canvas.height = parseFloat(pileHeight);
          _this.$refs.pMap.width = parseFloat(pileWidth);
          _this.$refs.pMap.height = parseFloat(pileHeight);
          _this.$refs.pMap.init();
        }
      });
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
    },
    config_post_data(val,oldVal){
      this.config_all(val);
    },
  }
}
</script>

<style scoped lang="scss">
  .el-table::before{
    height: 0 !important;
  }
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
  .b-control{
    padding:10px 20px;
    background: rgba(0,0,0,0.3);
    position: absolute;
    z-index:9999999;
    right:20px;
    top:20px;
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
          height: calc(100% - 60px);
          div{
            margin-top: 20px;
            float: left;
            text-align: center;
            width: 33%;
          }
        }
        .noConfig{
          width: 100%;
          height: calc(60% - 40px);
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          padding-top: 40%;
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
