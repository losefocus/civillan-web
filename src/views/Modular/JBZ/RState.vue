<template>
  <!--搅拌桩-->
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
     <div class="b-device" v-if="noDevice">
       <div class="t-device">
         <div class="d-text">
           {{typeName}}
         </div>
       </div>
     </div>
   </transition>
   <div class="r-box">
     <div class="t-box">
       <div class="r-stateTab" :class="{'tabActive':!isTab}" @click="tabChange(0)">运行状况</div>
       <div class="p-designTab" :class="{'tabActive':isTab}" @click="tabChange(1)">设计参数</div>
     </div>
     <ul class="s-box1">
       <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
         <div class="i-id">
           <div v-if="RT_data.pile_describe" class="d-model" :title="RT_data.pile_describe">{{RT_data.pile_describe}}</div>
           <div v-else class="d-model">暂无作业</div>
           <ul class="d-kind" v-if="isPile">
             <li v-for="(list,index) in deviceHead" @click="deviceChange(index)" :key="list" :class="{'deviceActive':index==deviceIndex}" :title="headTitle[index]">{{list}}</li>
           </ul>
         </div>
         <!--<div class="i-start">开始时间：<span>{{ RT_data.start_time/1 | formatDate }}</span></div>-->
         <div class="i-progress">
           <div class="i-progressName" style="width: 80px">作业进度：</div>
           <el-progress :stroke-width="15" :text-inside="true" :percentage="progressNum " color="#24BCF7" style="width: calc(100% - 80px)"></el-progress>
           <div class="clear"></div>
         </div>
         <div class="i-box">
           <div class="i-body">
             <div class="i-name">{{deviceName1}}</div>
             <div class="i-state">
          <span class="s-title" style="vertical-align: center">
            {{RT_data.nozzle_sta=='1'?'喷浆中':'未喷浆'}}
          </span>
               <div v-if="RT_data.nozzle_sta" :class="{'led-green':RT_data.nozzle_sta=='1','led-gray':RT_data.nozzle_sta==0}"></div>
               <div v-else class="led-gray"></div>
             </div>
           </div>
           <div class="i-body">
             <div class="i-company">{{productName}}</div>
             <div class="i-state">
          <span class="s-title">
            <span v-if="RT_data.record_sta==1">记录中</span>
            <span v-else-if="RT_data.record_sta==2">暂停记录</span>
            <span v-else-if="RT_data.record_sta==3">记录已完成</span>
            <span v-else>未记录</span>
          </span>
               <div v-if="RT_data.record_sta" :class="{'led-green':RT_data.record_sta==1,'led-skyBlue':RT_data.record_sta==2,'led-blue':RT_data.record_sta==3}"></div>
               <div v-else class="led-gray"></div>
             </div>
           </div>
         </div>
         <div class="clear"></div>
         <div class="clear"></div>
         <div class="h-box">
           <div class="b-info">
             <div class="b-infoName"><span class="iconfont icon-portrait"></span>
               <span v-if="deviceUserName" class="i-info">{{deviceUserName}}</span>
               <span v-else class="i-info">未绑定</span>
             </div>
             <div class="b-infoCall"><span class="iconfont icon-phonenew"></span>
               <span v-if="deviceUserPhone" class="i-info">{{deviceUserPhone}}</span>
               <span v-else class="i-info">暂无联系方式</span>
             </div>
           </div>
           <div class="b-angle">
             <div class="a-spot"></div>
           </div>
         </div>
         <div class="i-normal" v-if="isWarming">
           <p>{{isReal}}</p>
         </div>
         <div class="i-warning" v-else>
           <ul class="w-box">
             <li class="w-list" v-for="item in warmingData" :key="item">
               <i class="iconfont icon-warming"></i>
               <div class="w-text">
                 <p>{{item.message}}</p>
               </div>
             </li>
           </ul>

         </div>
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
                     <div style="margin-left: 25px;color: #24BCF7;margin-top: -9px;width: 60px"><!--{{ progress+'%'}}--><span style="font-size: 16px;font-weight: bold;">{{isNaN(progress)?0:progress}}</span></div>
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
  import sCurrent from '@/views/Modular/JBZ/RState/sCurrent'
  import sSpeed from '@/views/Modular/JBZ/RState/sSpeed'
  import sFlow from '@/views/Modular/JBZ/RState/sFlow'
  import {formatDate} from '@/common/formatDate.js';

  import deviceData from '@/api/device/deviceData'
  import config from '@/api/configure/config.js'
  import deviceConfig from '@/api/device/deviceConfig.js'

  import deviceUser from '@/api/device/deviceUser.js'
  import deviceList from '@/api/project/deviceList'

  import aSp from '@/views/Modular/JBZ/RState/AshPressureCurrent.vue'
  import pOperation from '@/views/Modular/JBZ/RState/pileOperation.vue'
  import pMap from '@/views/Modular/JBZ/RState/pileMap.vue'
  import deviceInfo from '@/views/Modular/JBZ/RState/deviceInfo.vue'
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
      deviceIndex:0,
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

      controlHead:0,
      historyRT:[],

      typeName:'',

      headTitle:[],

      //deviceInfo
      productName:'',
      deviceName1:'',
      deviceUserName:'',
      deviceUserPhone:'',
      isWarming:true,//未发现问题显示
      warmingData:[],
      isAngle:false,
      timer2:null,
      deviceType:{},
      isReal:'',
      isPile:false,  //是否是攪拌桩
      deviceInfo1:{},
      workState:{},
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

    this.historyReal();
    this.changeData()
  },
  mounted(){
    this.init();
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



    //切换设备头
    deviceChange(index){
      this.deviceIndex=index;
      this.controlHead=index;
      let deviceKey=this.$store.state.project.deviceKey;
      this.getData(deviceKey);
      this.historyReal();
    },


    //报警信息
    getAlarms(key){
      if(key){
        deviceData.alarms({'key':key}).then(res=>{
          if(res.success){
            if(res.result.length>0){
              this.isWarming=false;
              this.warmingData=res.result
            }else{
              this.isWarming=true;
            }
          }else{
            this.isWarming=true
          }
        }).catch(e=>{

        })
      }else{
      }

    },


    //获取设备信息
    getInfo(key){
      deviceList.list({key:key}).then(res=>{
        let data=res.result.items[0];
        //设备类型
        let headNum=key.substring(3,4);
        if(Number(headNum)>1){
          for(let i=1;i<=Number(headNum);i++){
            this.deviceHead.push(i);
          }
        }
        if(headNum<=1){
          this.isPile=false;
        }else{
          if(this.$store.state.project.changeTab==true){
            this.isPile=false;
          }else{
            this.isPile=true;
          }
        }

        this.productName=data.product.name;
        this.deviceName1=data.name;
        deviceUser.list({device_id:data.id}).then(res=>{
          if(res.success){
            if(res.result.total){
              this.deviceUserName=res.result.items[0].projectUser.name;
              this.deviceUserPhone=res.result.items[0].projectUser.phone;
            }
          }
        })

      }).catch(e=>{

      })
    },

    closeTab(){
      this.$store.dispatch('incrementTab',false);
    },
    //设备信息


    //遮罩
    getDeviceState(){
      if(this.$store.state.project.changeTab==true){
        this.noDevice=false;
      }else{
        this.noDevice=true;
        this.RT_data.depth_design=20;
      }
    },
    //历史数据和实时数据的切换
    changeData(){
      let key='';
      if(this.$store.state.project.changeTab==true){
        this.isReal='历史回放中';
        this.isPile=false;
        key=this.$store.state.project.historyKey;

        this.getInfo(key);

        this.getHistory();
        this.isConctrol=true;
        clearInterval(this.timer1);
        this.timer=setInterval(()=>{
          this.playBack()
        }, this.timeSpeed);
      }else{
        this.isReal='设备正常运行中';
        this.isConctrol=false;
        key=this.$store.state.project.deviceKey;
        this.getInfo(key);
        this.deviceInfo1=JSON.parse(sessionStorage.getItem('deviceInfo'));
        if(this.deviceInfo1){
          if(this.deviceInfo1.status==11){
            this.noDevice=false;
            this.getData(key);
            this.timer1=setInterval(()=>{
              this.getData(key);
            },3000);
            this.getAlarms(key);
            this.timer2=setInterval(()=>{
              this.getAlarms(key)
            },3000);
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
            this.getDeviceState();
          }else{

          }
        }
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
      deviceData.replay(post_data).then(res=>{
        this.historyData=res.result;
      }).catch(e=>{

      })
    },
    //数据输出
    playBack(){
      this.isReplay=false;
      let result=this.historyData;
      this.RT_data= Object.assign({},result[this.num]);
      this.progress=Number(this.RT_data.rdeep).toFixed(2);
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
              let obj={};
              for(let j=0;j<arr.length;j++){
                obj[arr[j]] = i==0?rawData[arr[j]]:rawData[arr[j]+(i+1)]
              }
              array.push(obj)
            }
            historyData.push(Object.assign(array[Number(this.controlHead)],commonObj))
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
            let headTitle=[];
            for(let i=0;i<headNum;i++){
              let obj={};
              for(let j=0;j<arr.length;j++){
                obj[arr[j]] = i==0?rawData[arr[j]]:rawData[arr[j]+(i+1)]
              }
              array.push(obj);
              headTitle.push(array[i].pile_describe)
            }
            if(headTitle!=this.headTitle){
              this.headTitle=headTitle;
            }
            this.RT_data= Object.assign(array[Number(this.controlHead)],commonObj);
            this.RT_data.depth_design=this.DesignDeep;
            this.progress=Math.abs(Number(this.RT_data.rdeep).toFixed(2));
            this.progressHeight=(1-(this.progress/parseFloat(this.DesignDeep)))*100+'%';
          }else{
            this.RT_data= res.result;
            this.RT_data.depth_design=this.DesignDeep;
            this.progress=Math.abs(Number(this.RT_data.rdeep).toFixed(2));
            this.progressHeight=(1-(this.progress/parseFloat(this.DesignDeep)))*100+'%';
          }

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
    /*background: rgba(255,255,255,0.7);*/
    z-index: 10;
    overflow: hidden;
    text-align: center;
    display: table;
    .t-device{
      display: table-cell;
      vertical-align: middle;
      font-size: 25px;
      text-align: center;
      .d-text{
        margin: 0 auto;
        text-align: center;
        width: 320px;
        height: 50px;
        line-height: 50px;
        color: #ffffff;
        background: rgba(0,0,0,0.5);
      }
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
          color:#ffffff !important;
          border: 1px solid #24BCF7 !important;
        }
        .i-id{
          font-size: 20px;
          color: rgba(218,218,218,1);
          width:100%;
          height: 8%;
          min-height: 20px;
          margin-top: 10%;
          overflow: hidden;
          .d-model{
            float: left;
            width: 60%;
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .d-kind{
            float: right;
            width: 30%;
            min-width: 60px;
            li{
              cursor: pointer;
              width: 20px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              margin-left: 10px;
              float: left;
              border-radius: 50%;
              border: 1px solid #90A4B7;
              font-size: 12px;
              color: #90A4B7;
            }
          }
        }
        .i-box{
          height: 20%;
          .i-body{
            width: 100%;
            height: 40%;
            .i-name{
              float: left;
              font-size:15px;
              color:rgba(51,51,51,1);
              font-weight: bold;
            }
            .i-company{
              float: left;
              font-size:10px;
              color:#999999;
            }
            .i-state{
              float: right;
              font-size:10px;
              color:#999999;
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
                background-color: #c1c1c1;
                width: 6px;
                height: 6px;
                box-shadow: 0px 0px 2px 4px #858585;
                -moz-box-shadow: 0px 0px 2px 4px #858585;
                -webkit-box-shadow: 0px 0px 2px 4px #858585;
                border-radius: 50%;
              }
              .led-skyBlue{
                display: inline-block;
                background-color: #f7ef8a;
                width: 6px;
                height: 6px;
                box-shadow: 0px 0px 2px 4px #ffaa17;
                -moz-box-shadow: 0px 0px 2px 4px #ffaa17;
                -webkit-box-shadow: 0px 0px 2px 4px #ffaa17;
                border-radius: 50%;
              }
              .led-blue{
                display: inline-block;
                background-color: #12E7FF;
                width: 6px;
                height: 6px;
                box-shadow: 0px 0px 2px 4px #31C4F7;
                -moz-box-shadow: 0px 0px 2px 4px #31C4F7;
                -webkit-box-shadow: 0px 0px 2px 4px #31C4F7;
                border-radius: 50%;
              }
              .s-title{
                vertical-align: middle;
                margin-right: 10px;
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
            float: left;
            width: 60%;
            height: 80%;

            .i-infoName{
              margin-left: 10px;
            }
            .b-infoName{
              height: 50%;
              .i-info{
                margin-left: 10px;
                color: #999999;
              }
            }
            .b-infoCall{
              height: 50%;
              .i-info{
                margin-left: 10px;
                color: #999999;
              }
            }
            /*.icon-portrait{
              color: #787F87;
            }
            .icon-phonenew{
              color: #787F87;
            }*/
          }
          .b-angle{
            float: right;
            width: 60px;
            height: 60px;
            background: url("../../../assets/Modular/JBZ/RState/angle.png") no-repeat;
            background-size: 100% 100%;
            position: relative;
            .a-spot{
              position: absolute;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              left: 27px;
              top: 26px;
              background: red;
            }
          }
        }
        .i-progress{
          width: 100%;
          margin-top: 2%;
          height: 12%;
          overflow: hidden;
          div{
            float: left;
          }
          .i-progressName{
            color: #999999
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
          width:calc(100% - 40px);
          padding: 10px 20px;
          height:calc(25% - 20px);
          background:rgba(248,89,89,0.06);
          overflow: auto;
          .w-box{
            .w-list{
              margin-top: 5px;
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
