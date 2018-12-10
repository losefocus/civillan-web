<template>
  <!--泡沫混凝土-->
  <div style="position: relative;height: 100%">
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
          <device-info :realData="RT_data" ></device-info>
        </li>
        <li class="s-info" :class="{'s-info1':classChange==1}" v-else>
          <div class="d-name">
            <i class="iconfont icon-pie"></i>
            <span>桩设计参考值</span>
          </div>
          <div class="d-level">
            <span>当前等级</span>
            <span> CF0.5</span>
          </div>
          <div class="d-box">
            <div>
              <p class="d-value">0.5</p>
              <p class="d-key">设计强度</p>
              <p class="d-unit">Mpa</p>
            </div>
            <div>
              <p class="d-value">276</p>
              <p class="d-key">水泥用量</p>
              <p class="d-unit">kg</p>
            </div>
            <div>
              <p class="d-value">10</p>
              <p class="d-key">材料用量</p>
              <p class="d-unit">kg</p>
            </div>
            <div>
              <p class="d-value">190</p>
              <p class="d-key">水用量</p>
              <p class="d-unit">kg</p>
            </div>
            <div>
              <p class="d-value">720</p>
              <p class="d-key">气泡群</p>
              <p class="d-unit">L</p>
            </div>
            <div>
              <p class="d-value">5.01</p>
              <p class="d-key">湿容重</p>
              <p class="d-unit">KN/m3</p>
            </div>
          </div>
        </li>
        <li class="s-liquidFill">
          <div class="c-body"><chart :options="polar1" :auto-resize=true></chart></div>
          <div class="c-body"><chart :options="polar2" :auto-resize=true></chart></div>
          <div class="c-body"><chart :options="polar3" :auto-resize=true></chart></div>
          <div class="c-body" style="margin-top: -6%"><chart :options="polar4" :auto-resize=true></chart></div>
          <div class="c-body" style="margin-top: -6%"><chart :options="polar5" :auto-resize=true></chart></div>
          <div class="c-body" style="margin-top: -6%"><chart :options="polar6" :auto-resize=true></chart></div>

          <!--<canvas id="c"></canvas>
          <input type="range" id="r" min="0" max="100" step="1">-->
        </li>
        <li class="s-chart" id="pile">
          <!-- <chart :options="ElectricCurrent" :auto-resize=true></chart>-->
          <div class="t-materiel">物料用量分析</div>
          <template>
            <el-table
              :data="tableData"

              border
              style="width: 100%;height:80%;margin-top: 30px">
              <el-table-column
                class-name="materielTable"
                prop="date"
                label="物料"
                style="height: 20%">
                <!--<template scope="props">
                  <div style="height: ">
                    {{props.row.date}}
                  </div>

                </template>-->
              </el-table-column>
              <el-table-column
                prop="name"
                label="设计用量">
              </el-table-column>
              <el-table-column
                prop="address"
                label="当前用量">
              </el-table-column>
              <el-table-column
                prop="address"
                label="剩余">
              </el-table-column>
            </el-table>
          </template>
        </li>
      </ul>
      <ul class="s-box2">
        <li class="s-progress" :class="{'s-progress1':classChange==1}">
          <div class="t-light">轻质土产出量</div>
          <div class="l-today">
            <span class="t-title">当日m3</span>
            <span class="el-icon-caret-right t-icon"></span>
            <span class="t-num">1000</span>
          </div>
          <div class="l-Accumulative">
            <span class="t-title">累计m3</span>
            <span class="el-icon-caret-right t-icon"></span>
            <span class="t-num">1000</span>
          </div>
        </li>
        <li class="s-chart1">
          <div style="font-size: 18px;font-weight: bold;margin: 20px 0 0 20px;">轻质土流量曲线</div>
          <chart :options="polar7" :auto-resize=true></chart>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import liquidFill from 'echarts-liquidfill'
  import RadialProgressBar from 'vue-radial-progress'
  import {formatDate} from '@/common/formatDate.js';

  import deviceData from '@/api/device/deviceData'
  import config from '@/api/configure/config.js'
  import deviceInfo from '@/views/Modular/JBZ/RState/deviceInfo.vue'
  export default {
    name: "runningState",
    components:{
      RadialProgressBar,
      deviceInfo,
    },
    data(){
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

        RT_data:{}, //实时数据

        isWarming:true,//未发现问题显示
        warmingText:'',

        isTab:false,//设备型号切换

        tableData: [
          {
          date: '水泥',
          name: '300KG',
          address: '2500KG'
        }, {
          date: '发泡剂',
          name: '300KG',
          address: '2500KG'
        }, {
          date: '水',
          name: '300KG',
          address: '2500KG'
        }],
        polar7:{
          tooltip: {
            trigger: 'axis',
            formatter: "{b} <br> 进度: {c}"
          },
          legend: {
            itemWidth: 12,
            itemHeight: 5,
            itemGap: 13,
            textStyle: {
              fontSize: 12,
              color: '#333'
            },
            right:'3%'
          },
          grid: {
            top:'10%',
            left: '3%',
            right: '4%',
            bottom: '8%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '当日流量',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#50C9F9',
                borderColor: '#50C9F9',
              }
            },
            areaStyle: {
              normal: {
                color: '#50C9F9',
                borderColor: '#50C9F9',
              }
            }
          }]
        },
        polar1:{
          series: [{
            type: 'liquidFill',
            name: 'm3/h',
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#EEEEEE',
              color: '#ffffff',
              borderWidth: 1,
            },
            data: [{
              name: '溶液',
              value: 0.6
            }],
            itemStyle: {
              shadowBlur: 0
            },
            amplitude: '4%',
            waveLength: '90%',
            radius: '80%',
            color: ['#DF9A9A'],

            label: {
              normal: {
                formatter: function(param) {
                  return param.value*100+'%' + '\n'
                    + param.name + '\n'
                    + param.seriesName;
                },
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }]
        },
        polar2:{
          series: [{
            type: 'liquidFill',
            name: 'm3/h',
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#EEEEEE',
              color: '#ffffff',
              borderWidth: 1,
            },
            data: [{
              name: '泥浆',
              value: 0.6
            }],
            itemStyle: {
              shadowBlur: 0
            },
            amplitude: '4%',
            waveLength: '90%',
            radius: '80%',
            color: ['#885018'],

            label: {
              normal: {
                formatter: function(param) {
                  return param.value*100+'%' + '\n'
                    + param.name + '\n'
                    + param.seriesName;
                },
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }]
        },
        polar3:{
          series: [{
            type: 'liquidFill',
            name: 'm3/h',
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#EEEEEE',
              color: '#ffffff',
              borderWidth: 1,
            },
            data: [{
              name: '空气',
              value: 0.6
            }],
            itemStyle: {
              shadowBlur: 0
            },
            amplitude: '4%',
            waveLength: '90%',
            radius: '80%',
            color: ['#50CEF5'],

            label: {
              normal: {
                formatter: function(param) {
                  return param.value*100+'%' + '\n'
                    + param.name + '\n'
                    + param.seriesName;
                },
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }]
        },
        polar4:{
          series: [{
            type: 'liquidFill',
            name: 'm3/h',
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#EEEEEE',
              color: '#ffffff',
              borderWidth: 1,
            },
            data: [{
              name: '轻质土流量',
              value: 0.6
            }],
            itemStyle: {
              shadowBlur: 0
            },
            amplitude: '4%',
            waveLength: '90%',
            radius: '80%',
            color: ['#90A5A7'],

            label: {
              normal: {
                formatter: function(param) {
                  return param.value*100+'%' + '\n'
                    + param.name + '\n'
                    + param.seriesName;
                },
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }]
        },
        polar5:{
          series: [{
            type: 'liquidFill',
            name: '70%',
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#EEEEEE',
              color: '#ffffff',
              borderWidth: 1,
            },
            data: [{
              name: '气泡密度',
              value: 'kg/m3'
            }],
            itemStyle: {
              shadowBlur: 0,
            },
            amplitude: '4%',
            waveLength: '90%',
            radius: '80%',
            color: ['#50C9F9'],

            label: {
              normal: {
                formatter: function(param) {
                  return param.seriesName + '\n'
                    + param.name + '\n'
                    + param.value;
                },
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }]
        },
        polar6:{
          series: [{
            type: 'liquidFill',
            name: '60%',
            outline: {
              show: false
            },
            backgroundStyle: {
              borderColor: '#EEEEEE',
              color: '#ffffff',
              borderWidth: 1,
            },
            data: [{
              name: '湿容重',
              value: 'kn/h'
            }],
            itemStyle: {
              shadowBlur: 0,
            },
            amplitude: '4%',
            waveLength: '90%',
            radius: '80%',
            color: ['#50C9F9'],

            label: {
              normal: {
                formatter: function(param) {
                  return param.seriesName + '\n'
                    + param.name + '\n'
                    + param.value;
                },
                textStyle: {
                  fontSize: 14
                }
              }
            }
          }]
        },
        ctx:null,

        productName:'',
        deviceName1:'',
        deviceUserName:'',
        deviceUserPhone:'',

        typeName:''
      }
    },
    props:['dialogFullScreen','deviceKey','isClose'],
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd'); //yyyy-MM-dd hh:mm
      }
    },
    created(){
      this.getConfig();
      this.getDeviceInfo();
      //this.getDeviceConfig(this.deviceKey);
      let deviceKey=this.$store.state.project.deviceKey;
      this.getData(deviceKey);
      /*this.timer=setInterval(()=>{
        this.getData(this.deviceKey);
        this.getAlarms(this.deviceKey)
      },5000);*/

    },
    mounted(){
      this.reload();
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },

    methods:{
      //遮罩
      getDeviceState(){
        if(this.$store.state.project.changeTab==true){
          this.noDevice=false;
        }else{
          this.noDevice=true;
          this.RT_data.depth_design=20;
        }
      },
      //设备信息
      getDeviceInfo(){
        this.deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
        if(this.deviceInfo.status==11){
          this.noDevice=false;
          this.getData(deviceKey);
          this.timer1=setInterval(()=>{
            this.getData(deviceKey);
          },3000);
        }else if(this.deviceInfo.status==0){
          this.typeName='该设备未激活';
          this.getDeviceState()
        }else if(this.deviceInfo.status==1){
          this.typeName='该设备已离线';
          this.getDeviceState()
        }else if(this.deviceInfo.status==2){
          this.typeName='该设备已离场';
          this.getDeviceState()
        }else if(this.deviceInfo.status==21){
          this.typeName='该设备故障中';
          this.getDeviceState();
        }else{

        }
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
    },


    watch:{
      isClose(val,oldVal){
      }
    }
  }
</script>

<style scoped lang="scss">

  #c{
    margin: 0 auto;
    display: block;
  }
  #r{
    display: block;
    margin: 0 auto;
  }
  #r::before{
    color: black;
    content: attr(min);
    padding-right: 10px;
  }
  #r::after{
    color: black;
    content: attr(max);
    padding-left: 10px;
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
    height: calc(100% - 40px);
  }
  .b-device{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    //background: rgba(255,255,255,0.7);
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
    .t-box1{
      .r-stateTab{
        font-size: 14px;
      }
      .p-designTab{
        font-size: 14px;
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
        .d-level{
          margin-top: 30px;
          color: #F85959;
        }
        .d-box{
          height: 60%;

          div{
            margin-top: 50px;
            float: left;
            text-align: center;
            width: 33%;
          }

          .d-unit{
            margin-top: 5px;
            font-size: 18px;
            color: #666666;
          }
          .d-key{
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #666666;
          }
          .d-value{

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
        height: 100%;
        padding:10px 20px;
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        .t-light{
          font-weight: bold;
          font-size: 18px;
          margin-top: 10px;
        }
        .l-today,.l-Accumulative{
          margin-top: 20%;
          .t-title{
            display: inline-block;
            width: 50px;
            font-size: 18px;
            font-weight: bold;
            vertical-align: middle;
          }
          .t-icon{
            font-size: 25px;
            color: #D8D8D8;
            vertical-align: middle;
          }
          .t-num{
            font-weight: bold;
            font-size: 50px;
            vertical-align: middle;
            color: #24BCF7;
          }
        }
      }
      .s-liquidFill{
        float: left;
        height: 100%;
        margin-left: 10px;
        width:calc( 38.5% - 30px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        .c-body{
          width: 33.33%;
          height: 60%;
          float: left;
        }
      }
      .s-chart{
        float: left;
        height: calc(100% - 40px);
        margin-left: 10px;
        padding: 20px;
        width:calc( 38.5% - 70px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        .t-materiel{
          font-size: 18px;
          font-weight: bold;
        }

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
