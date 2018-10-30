<template>
  <div style="position: relative;height: 100%">
    <transition name="fade">
      <div class="b-device" v-if="noDevice"><div class="t-device">设备已离线！</div></div>
    </transition>
    <div class="r-box">
      <ul class="s-box1">
        <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
          <div class="i-id">
            <div class="d-model">{{deviceName[deviceIndex-1].name}}</div>
          </div>
          <div class="i-progress">
            <div class="i-progressName" style="width: 80px">作业进度：</div>
            <el-progress :stroke-width="15" :text-inside="true" :percentage="progressNum " color="#24BCF7" style="width: calc(100% - 80px)"></el-progress>
            <div class="clear"></div>
          </div>
          <div class="i-box">
            <div class="i-body">
              <div class="i-name">{{deviceName1}}</div>
              <div class="i-state"><span style="vertical-align: center">在线状态</span><div class="led-green" :class="{'led-green':RT_data.nozzle_sta==1,'led-gray':RT_data.nozzle_sta==0}"></div></div>
            </div>
            <div class="i-body">
              <div class="i-company">{{productName}}</div>
              <div class="i-state"><span>养护状态</span><div class="led-green" :class="{'led-green':RT_data.record_sta==1,'led-gray':RT_data.record_sta==2,'led-blue':RT_data.record_sta==3}"></div></div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="h-box">
            <div class="b-info"><span class="iconfont icon-portrait"></span><span class="i-info">{{deviceUserName}}</span></div>
            <div class="b-info"><span class="iconfont icon-phonenew"></span><span class="i-info">{{deviceUserPhone}}</span></div>
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
        <li class="s-liquidFill">
          <div style="width: 100%;height: 20%;position: absolute;top:8%;">
            <ul class="l-current">
              <li class="c-temperature">
                <span class="t-title">1号顶张拉力</span>
                <i class="el-icon-caret-right" style="color: #D8D8D8"></i>
                <span class="t-num">25.0</span>
                <span class="t-unit">℃</span>
              </li>
              <li class="c-temperature">
                <span class="t-title">2号顶张拉力</span>
                <i class="el-icon-caret-right"  style="color: #D8D8D8"></i>
                <span class="t-num">66</span>
                <span class="t-unit">%</span>
              </li>
            </ul>
          </div>
          <div id="THCharts" style="width: 100%;height: 100%;"></div>
        </li>
      </ul>
      <ul class="s-box2">
        <li class="b-curing" v-for="(list,index) in curingData" :key="index">
          <div class="c-passageway">通道{{index+1}}</div>
          <div class="c-state">
            <div class="s-Maintenance" v-if="list.state">养护中</div>
            <div class="s-NonMaintenance" v-else>未养护</div>
          </div>
          <div class="c-MaintenanceSwitch">
            <div class="s-MaintenanceOn" :style="{backgroundImage:'url(' + MaintenanceOn + ')'}" v-if="list.state"></div>
            <div class="s-MaintenanceOff" :style="{backgroundImage:'url(' + MaintenanceOff + ')'}" v-else></div>
          </div>
          <div class="c-MaintenanceState">
            <div class="s-Maintenance" :style="{backgroundImage:'url(' + Maintenance + ')'}" v-if="list.state"></div>
            <div class="s-NonMaintenance" :style="{backgroundImage:'url(' + NonMaintenance + ')'}" v-else></div>
          </div>
          <div class="c-curingInfo">
            <div>梁号：{{ list.num }}</div>
            <div>台座号：{{ list.id }}</div>
            <div>{{ list.name }}</div>
          </div>
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

  import Maintenance from '@/assets/curing/Maintenance.png'
  import MaintenanceOff from '@/assets/curing/MaintenanceOff.png'
  import MaintenanceOn from '@/assets/curing/MaintenanceOn.png'
  import NonMaintenance from '@/assets/curing/NonMaintenance.png'

  export default {
    name: "SCuring",
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
      return {
        Maintenance:Maintenance,
        MaintenanceOff:MaintenanceOff,
        MaintenanceOn:MaintenanceOn,
        NonMaintenance:NonMaintenance,
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
        progressNum:0,
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

        RT_data:{}, //实时数据
        curingData:[
          {state:0,num:8888,id:8,name:'浙江桥梁工程'},
          {state:1,num:8888,id:8,name:'浙江桥梁工程'},
          {state:0,num:8888,id:8,name:'浙江桥梁工程'},
          {state:1,num:8888,id:8,name:'浙江桥梁工程'},
          {state:0,num:8888,id:8,name:'浙江桥梁工程'},
          {state:1,num:8888,id:8,name:'浙江桥梁工程'},
          {state:0,num:8888,id:8,name:'浙江桥梁工程'},
          {state:1,num:8888,id:8,name:'浙江桥梁工程'},
        ],

        progress:0,
        progressHeight:'',
        DesignDeep:30,

        isWarming:true,//未发现问题显示
        warmingText:'',

        isTab:false,//设备型号切换

        myChart:null, //温度湿度 echarts

        ctx:null,

        productName:'',
        deviceName1:'',
        deviceUserName:'',
        deviceUserPhone:'',
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
      this.getDeviceInfo();
      let deviceKey=this.$store.state.project.deviceKey;
      this.getData(deviceKey);
      this.getAlarms(deviceKey);
    },
    mounted(){
      this.init();
      this.myCharts();
      this.$nextTick(()=>{
        this.myChart.resize()
      });
      this.reload();
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },

    methods:{
      init(){
        let clientWidth=document.body.clientWidth;
      },
      //设备信息
      getDeviceInfo(){
        this.deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
        if(this.deviceInfo.id==11){
          this.noDevice=false;
        }else{
          this.noDevice=true;
        }
        this.productName=this.deviceInfo.product.name;
        this.deviceName1=this.deviceInfo.name;
        deviceUser.list({device_id:this.deviceInfo.id}).then(res=>{
          if(res.success){
            if(res.result.total){
              this.deviceUserName=res.result.items[0].projectUser.name;
              this.deviceUserPhone=res.result.items[0].projectUser.phone;
            }
          }
        })
      },
      deviceChange(index){
        this.deviceIndex=index;
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

      myCharts(){
        let colors = ['#24BCF7', '#F85959'];
        let data=[ "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00" ];
        let data1= [ 699, 656, 0, 0, 78, 435, 1014, 1129, 747, 1183, 648, 1006, 737, 880, 777, 685, 469, 731, 319, 873, 824, 545, 0, 0 ];
        let data2=[ 0, 0, 0, 1, 1, 0, 4, 31, 21, 18, 23, 22, 18, 19, 19, 16, 15, 22, 17, 18, 19, 16, 12, 9 ];

        function yAxisMax(arr) {
          var max = Math.max.apply(null, arr);//取数组中的最大值
          var maxint = Math.ceil(max / 10);//去除个位数
          var maxval = maxint * 10;//补上各位十位加1
          return maxval;
        }
        //y轴间隔刻度数
        let splitNumber=5;

        let maxdata1 = yAxisMax(data1);
        let maxdata2 = yAxisMax(data2);
        let interval_left=maxdata1/splitNumber;//刻度间隔距离
        let interval_right=maxdata2/splitNumber;//刻度间隔距离

        this.myChart = this.$echarts.init(document.getElementById('THCharts'));
        this.myChart.setOption({
          title: {
            text: '温湿度变化曲线',
            show: true,
            textStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#333'
            },
            top:'4%',
            left: '3%'
          },
          color: colors,

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            top:'25%',
            bottom:'10%',
          },
          /*toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },*/
          legend: {
            itemWidth: 12,
            itemHeight: 5,
            itemGap: 13,
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            top:'8%',
            right:'2%',
          },
          xAxis: [

            {
              axisTick: {
                show: false
              },
              /*axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 12,
                  color: '#999'
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#ccc'
                }
              },*/
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: data
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '湿度',
              min: 0,
              position: 'right',
              max:maxdata2,
              splitNumber:splitNumber,
              interval:interval_right,
              axisLabel: {
                formatter: '{value} %'
              }
            },
            {
              type: 'value',
              name: '温度',
              min: 0,
              position: 'left',
              max:maxdata1,
              splitNumber:splitNumber,
              interval:interval_left,
              /*axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },*/
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name:'湿度',
              type:'line',
              yAxisIndex: 0,
              data:data2,
            },
            {
              name:'温度',
              type:'line',
              yAxisIndex: 1,
              data:data1,
            }
          ]
        });
      },

      //实时数据
      getData(key){
        deviceData.list({'key':key}).then(res=>{
          if(res.success){
            this.RT_data=res.result;
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
          if(res.success){
            this.isWarming=false;
            this.warmingText=res.result[0].message
          }else{
            this.isWarming=true
          }

        }).catch(e=>{
        })
      },
    },
    watch:{
      dialogFullscreen:function (val,oldVal) {
        this.myChart.resize()
      },
      isClose(val,oldVal){
        //console.log(val,oldVal)
      },
      clientWidth(val,oldVal){
        this.myChart.resize()
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
    height: calc(100% - 60px);
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
    height: 100%;
    position: relative;
    .clear{
      clear: both;
    }
    .s-box1,.s-box2{
      background-color: #F5F5F9;
      overflow: hidden;
      .s-info{
        float: left;
        width:23%;
        height: 100%;
        padding:0 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
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
            .i-name{
              float: left;
              font-weight: bold;
              font-size:15px;
              color:rgba(51,51,51,1);
            }
            .i-company{
              float: left;
              font-size:10px;
              color:#999999;
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
                background-color: #666666;
                width: 6px;
                height: 6px;
                box-shadow: 0px 0px 2px 4px #666666;
                -moz-box-shadow: 0px 0px 2px 4px #666666;
                -webkit-box-shadow: 0px 0px 2px 4px #666666;
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
            .i-info{
              margin-left: 10px;
              color: #999999;
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
            color: #999999;
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
      }
      .s-liquidFill{
        float: left;
        height: 100%;
        margin-left: 10px;
        width:calc( 77% - 50px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        position: relative;
        .l-current{
          width: 380px;
          margin: 0 auto;
          .c-temperature{
            float: left;
            margin-right: 10%;
            .t-title{
              color: #666666;
              font-weight: bold;
            }
            .t-num{
              color: #F85959;
              font-size: 20px;
              font-weight: bold;
            }
            .t-unit{
              color: #F85959;
              font-size: 12px;
            }
          }
          .c-temperature:last-child{
            float: right;
          }
        }
      }
    }
    .s-box1{
      height: 49%;
      padding: 0 0 10px 0;
    }
    .s-box2{
      background:rgba(255,255,255,1);
      box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
      width: calc(100% - 20px);
      height: calc(49% - 20px);
      padding: 10px;
      .b-curing{
        width: 12.5%;
        height: 100%;
        float: left;
        .c-passageway{
          margin-top: 25%;
          text-align: center;
        }
        .c-state{
          width: 100%;
          margin-top: 10%;
          .s-Maintenance,.s-NonMaintenance{
            width: 60%;
            height: 20px;
            margin: 0 auto;
            text-align: center;
          }
          .s-NonMaintenance{
            color: #ffffff;
            background: rgba(218,218,218,1);
          }
          .s-Maintenance{
            color: #ffffff;
            background:rgba(36,188,247,1);
          }

        }
        .c-MaintenanceSwitch{
          margin-top: 20%;
          .s-MaintenanceOn{
             width: 50%;
             height: 15px;
             margin: 0 auto;
             background-repeat: no-repeat;
             background-size: 100% 100%;
           }
          .s-MaintenanceOff{
            width: 50%;
            height: 15px;
            margin: 0 auto;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        .c-MaintenanceState{
          margin-top: 3%;
          height: 30%;
          .s-Maintenance{
            width: 100%;
            height: 77%;
            background-size: 100% 100%;
          }
          .s-NonMaintenance{
            width: 100%;
            height: 37%;
            background-size: 100% 100%;
          }
        }
        .c-curingInfo{
          width: 100%;
          div{
            width: 100%;
            text-align: center;
          }
        }
      }
    }
  }

</style>

