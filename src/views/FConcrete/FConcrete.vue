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
  import echarts from 'echarts'
  import liquidFill from 'echarts-liquidfill'
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
            /*backgroundStyle: {
              //borderColor: '#32a3cf',
              color: '#8fcccf',
              borderWidth: 1,
            },*/
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
        polar2:{
          series: [{
            type: 'liquidFill',
            name: 'm3/h',
            outline: {
              show: false
            },
            /*backgroundStyle: {
              //borderColor: '#32a3cf',
              color: '#8fcccf',
              borderWidth: 1,
            },*/
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
        polar3:{
          series: [{
            type: 'liquidFill',
            name: 'm3/h',
            outline: {
              show: false
            },
            /*backgroundStyle: {
              //borderColor: '#32a3cf',
              color: '#8fcccf',
              borderWidth: 1,
            },*/
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
            /*backgroundStyle: {
              //borderColor: '#32a3cf',
              color: '#8fcccf',
              borderWidth: 1,
            },*/
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
        polar5:{
          series: [{
            type: 'liquidFill',
            name: 'kg/m3',
            outline: {
              show: false
            },
            /*backgroundStyle: {
              //borderColor: '#32a3cf',
              color: '#8fcccf',
              borderWidth: 1,
            },*/
            data: [{
              name: '气泡密度',
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
        polar6:{
          series: [{
            type: 'liquidFill',
            name: 'kn/h',
            outline: {
              show: false
            },
            /*backgroundStyle: {
              //borderColor: '#32a3cf',
              color: '#8fcccf',
              borderWidth: 1,
            },*/
            data: [{
              name: '湿容重',
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
        ctx:null,
      }
    },
    props:['dialogFullscreen','deviceKey','isClose'],
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

      /*this.energySphere();*/

      let _this=this;
      /*window.onresize = function(){
        /!*_this.$nextTick(()=>{
          let pile=document.getElementById('pile');
          if(!pile){
            //console.log('dom销毁')
          }else{
            let pileHeight,pileWidth
            if(pile.currentStyle){
              pileHeight = pile.currentStyle.height
              pileWidth = pile.currentStyle.width
            }else {
              pileHeight = window.getComputedStyle(pile).height;
              pileWidth = window.getComputedStyle(pile).width;
            }
            _this.$refs.pMap.canvas.width = parseFloat(pileWidth);
            _this.$refs.pMap.canvas.height = parseFloat(pileHeight);
            _this.$refs.pMap.width = parseFloat(pileWidth);
            _this.$refs.pMap.height = parseFloat(pileHeight);
            _this.$refs.pMap.init();
          }

        });


        if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()}
        if( that.$refs.aSp!==undefined){that.$refs.aSp.resize();}
        if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()}
        if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()}
        let clientWidth=document.body.clientWidth;
        that.temp(that.dialogFullscreen,that.diameter,that,clientWidth)*!/
      }*/
    },
    beforeDestroy(){
      clearInterval(this.timer);
      //console.log('已销毁');
    },

    methods:{
      init(){
        let clientWidth=document.body.clientWidth;
        /*this.temp(this.dialogFullscreen,this.diameter,this,clientWidth)*/
      },
      deviceChange(index){
        this.deviceIndex=index;
      },
      /*temp(isDialog,diameter,that,clientWidth) {
        if(!isDialog){
          this.classChange=2;
          if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()}
          if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()}
          if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()}
          if( that.$refs.aSp!==undefined){this.$refs.aSp.resize();}
          if(clientWidth>1660){
            diameter=110;
          }else if(clientWidth<1660&&clientWidth>1500){
            diameter=120;
          }else if(clientWidth<1500&&clientWidth>1380){
            that.$emit('dialogFullscreen','true');
            that.$emit('zoomShow','false');
            that.isShow=false;
            diameter=100;
          }else if(clientWidth<1380){
            that.$emit('zoomShow','false');
            that.$emit('dialogFullscreen','true')
          }
        }else{
          if( that.$refs.sCurrent!==undefined){that.$refs.sCurrent.resize()};
          if( that.$refs.sSpeed!==undefined){that.$refs.sSpeed.resize()};
          if( that.$refs.sFlow!==undefined){that.$refs.sFlow.resize()};
          if( that.$refs.aSp!==undefined){this.$refs.aSp.resize();};
          if(clientWidth>1800){
            this.classChange=1;
            diameter=170;
          }else if(clientWidth<1800&&clientWidth>1700){
            this.classChange=1;
            diameter=160;
          }else if(clientWidth<1700&&clientWidth>1600){
            this.classChange=1;
            diameter=140;
          }else if(clientWidth<1600&&clientWidth>1510){
            this.classChange=1;
            diameter=120;
          }else if(clientWidth<1510&&clientWidth>1420){
            this.classChange=2;
            diameter=120;
          }else if(clientWidth<1420&&clientWidth>1300){
            this.classChange=2;
            diameter=110;
          }else if(clientWidth<1300&&clientWidth>1200){
            this.classChange=2;
            diameter=110;
          }else if(clientWidth<1200&&clientWidth>1100){
            this.classChange=2;
            diameter=120;
          }else if(clientWidth<1100&&clientWidth>1000){
            this.classChange=2;
            diameter=120;
          }
        }
        this.diameter=diameter
      },*/
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
            this.noDevice=true;
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
          if(res.success){
            this.isWarming=false;
            this.warmingText=res.result[0].message
          }else{
            this.isWarming=true
          }

        }).catch(e=>{
          //console.log(e)
        })
      },
    },


    watch:{
      isClose(val,oldVal){
        console.log(val,oldVal)
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
