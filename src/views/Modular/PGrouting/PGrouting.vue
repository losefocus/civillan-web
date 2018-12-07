<template>
  <!--预应力压浆-->
  <div style="position: relative;height: 100%">
    <transition name="fade">
      <div class="b-device" v-if="noDevice"><div class="t-device">预应力压浆！</div></div>
    </transition>
    <div class="r-box">
      <ul class="s-box1">
        <li class="s-info" :class="{'s-info1':classChange==1}" v-if="!isTab">
          <device-info :realData="RT_data" ></device-info>
        </li>
        <li class="b-statistics">
          <ul class="b-dashboard">
            <li class="c-dashboard">
              <chart :options="polar1" :auto-resize=true></chart>
              <ul class="c-option">
                <li><span class="c-name">开始时间：</span><span class="c-key">2018-11-12 12:30:10</span></li>
                <li><span class="c-name">搅拌时间：</span><span class="c-key">240s</span></li>
              </ul>
            </li>
            <li class="c-dashboard">
              <chart :options="polar1" :auto-resize=true></chart>
              <ul class="c-option">
                <li><span class="c-name">配合比：</span><span class="c-key">14 : 1 : 7</span><span>（水泥:压浆剂:水）</span></li>
                <li><span class="c-name">水胶比：</span><span class="c-key">0.33</span></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="b-data">
          <ul class="d-window">
            <li class="w-body">
              <div class="w-name">进浆量(L)</div>
              <div class="w-key">300</div>
            </li>
            <li class="w-body">
              <div class="w-name">进浆量(L)</div>
              <div class="w-key">300</div>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="s-box2">
        <li class="s-progress" :class="{'s-progress1':classChange==1}">
          <div class="t-light">设计参数</div>
          <div class="l-today">
            <ul class="t-tensileData">
              <li class="d-tensile">
                <span>N匝道2号桥</span>
              </li>
              <li class="d-tensile1">
                <span>梁板类型：30米T粱</span>
              </li>
              <div style="clear: both"></div>
            </ul>
          </div>
          <div class="b-line"></div>
          <ul class="b-detailed">
            <li class="c-detailed">
              <span>孔道数：</span>
              <span>10000.0</span>
              <span>KN</span>
            </li>
            <li class="c-detailed">
              <span>孔道内径：</span>
              <span>0~3</span>
            </li>
            <li class="c-detailed">
              <span>孔道长度：</span>
              <span>50%</span>
            </li>
            <li class="c-detailed">
              <span>步骤次数：</span>
              <span>50%</span>
            </li>
          </ul>
          <ul class="b-detailed">
            <li class="c-detailed">
              <span>压浆模式：</span>
              <span>1000.0</span>
              <span>mm</span>
            </li>
            <li class="c-detailed">
              <span>压浆方向：</span>
              <span>100.0</span>
              <span>m</span>
            </li>
            <li class="c-detailed">
              <span>流动初速：</span>
              <span>50.00</span>
              <span>Mpa</span>
            </li>
            <li class="c-detailed">
              <span>流动度：</span>
              <span>50.00</span>
              <span>Mpa</span>
            </li>
          </ul>
          <div class="l-Accumulative">

          </div>
        </li>
        <li class="s-chart1">
          <div style="width: 100%;height: 20%;position: absolute;top:8%;">
            <ul class="l-current">
              <li class="c-temperature">
                <span class="t-title">浆液温度：</span>
                <i class="el-icon-caret-right" style="color: #D8D8D8"></i>
                <span class="t-num">25.0</span>
                <span class="t-unit">℃</span>
              </li>
              <li class="c-temperature">
                <span class="t-title">环境温度：</span>
                <i class="el-icon-caret-right"  style="color: #D8D8D8"></i>
                <span class="t-num">66</span>
                <span class="t-unit">℃</span>
              </li>
            </ul>
          </div>

          <div id="THCharts" style="width: 100%;height: 100%;"></div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import liquidFill from 'echarts-liquidfill'
  import RadialProgressBar from 'vue-radial-progress'
  import {formatDate} from '@/common/formatDate.js';

  import deviceData from '@/api/device/deviceData'
  import config from '@/api/configure/config.js'

  import deviceInfo from '@/views/Modular/MPile/RState/deviceInfo.vue'
  export default {
    name: "TTensile",
    components:{
      RadialProgressBar,
      deviceInfo,
    },
    data(){
      let data = [0,10,20,30,40,50,60,70,80,90,100];
      let Data=data;

      return {
        timer:null,//定时器,
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

        progressNum:40,//深度进度
        progress:0,

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
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          series: [{
            title : {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 12,
              offsetCenter: [0, '64%'],
              textStyle:{
                color:'#999999',
              }
            },
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 1000,
            radius: "100%",
            center: ["50%", "65%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 30,
                shadowBlur: 0,
                color: [
                  [0, '#1FBDEE'],
                  [0.6, '#1FBDEE'],
                  [0.8, '#DFDFDF'],
                  [1, '#DFDFDF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            pointer: {
              width: "3%",
              length: '90%',
              color: "black"
            },
            itemStyle: {
              normal: {
                color: "#4A4A4A",
                shadowBlur: 1
              }
            },

            /*title: {
              show: true
            },
            detail: {
              show: true
            },*/
            data: [{
              value:300, name:'主油压(MPa）'
            }]
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
        ctx:null,


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
      this.init();
      this.reload();
      this.myCharts();
      this.$nextTick(()=>{
        this.myChart.resize()
      });
    },
    beforeDestroy(){
      clearInterval(this.timer);
    },

    methods:{
      init(){
        let clientWidth=document.body.clientWidth;
        /*this.temp(this.dialogFullscreen,this.diameter,this,clientWidth)*/
      },
      //设备信息
      getDeviceInfo(){
        this.deviceInfo=JSON.parse(sessionStorage.getItem('deviceInfo'));
        if(this.deviceInfo.status==11){
          this.noDevice=false;
        }else{
          this.noDevice=false;
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


      //ECharts
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
            text: '时间-压力变化曲线',
            show: true,
            textStyle: {
              fontWeight: 'bold',
              fontSize: 18,
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
              name: '环境温度：',
              min: 0,
              position: 'right',
              max:maxdata2,
              splitNumber:splitNumber,
              interval:interval_right,
              axisLabel: {
                formatter: '{value} KN'
              }
            },
            {
              type: 'value',
              name: '浆液温度：',
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
                formatter: '{value} KN'
              }
            }
          ],
          series: [
            {
              name:'环境温度：',
              type:'line',
              yAxisIndex: 0,
              data:data2,
            },
            {
              name:'浆液温度：',
              type:'line',
              yAxisIndex: 1,
              data:data1,
            }
          ]
        });
      },
    },



    watch:{
      isClose(val,oldVal){
      },
      dialogFullScreen:function (val,oldVal) {
        this.myChart.resize()
      },
      clientWidth(val,oldVal){
        this.myChart.resize()
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
        color:#000000;
        .t-light{
          font-weight: bold;
          font-size: 18px;
          margin-top: 10px;
        }
        .l-today{
          width: 100%;
          .t-tensileData{
            .d-tensile{
              margin-right: 7%;
              margin-top: 7%;
              span{
                color:#666666;
                font-size: 18px;
                font-weight: bold;
              }
            }
            .d-tensile1{
              margin-top: 5px;
              color: #999999;
            }
          }
        }

        .b-detailed{
          margin-top: 6%;
          .c-detailed{
            color: #999999;
            font-size: 14px;
            margin-top: 2%;
          }
        }
      }
      .b-statistics{
        float: left;
        height: calc(100% - 40px);
        margin-left: 10px;
        width:calc( 53.5% - 70px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        padding: 20px;
        .b-dashboard{
          width: 100%;
          height: 100%;
          .c-dashboard{
            float: left;
            width: 50%;
            height: 80%;

            .c-option{
              width: 240px;
              margin: 30px auto;
              font-size: 14px;
              li{
                height: 30px;
                .c-name{
                  color: #999999;
                }
                .c-key{
                  color: #666666;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
      .b-data{
        float: left;
        height: 100%;
        margin-left: 10px;
        width:calc( 23.5% - 30px );
        .d-window{
          height: 100%;
          .w-body{
            text-align: center;
            background:rgba(255,255,255,1);
            box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
            height: calc(50% - 5px);
            overflow: hidden;
            .w-name{
              margin-top: 25%;
              font-size: 18px;
            }
            .w-key{
              color: #1FBDEE;
              margin-top: 10px;
              font-weight: bold;
              font-size: 40px;
            }
          }
          .w-body:last-child{
            height: calc(50% - 5px);
            margin-top: 10px;
          }
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
        float: left;
        height: 100%;
        margin-left: 10px;
        width:calc( 77% - 50px );
        background:rgba(255,255,255,1);
        box-shadow:0 3px 4px 0 rgba(144,164,183,0.2);
        position: relative;
        .l-current{
          width: 320px;
          height: 20%;
          margin: 0 auto;
          .c-temperature{
            float: left;
            margin-right: 10px;
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
            margin-right: 0;
          }
        }
      }
    }
    .s-box1{
      padding: 0 0 10px 0;
    }
  }
</style>
